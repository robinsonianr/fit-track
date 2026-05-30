package com.robinsonir.fittrack.security.auth;

import com.robinsonir.fittrack.data.Gender;
import com.robinsonir.fittrack.data.entity.member.MemberEntity;
import com.robinsonir.fittrack.data.repository.member.MemberDTO;
import com.robinsonir.fittrack.data.repository.member.MemberRepository;
import com.robinsonir.fittrack.mappers.MemberMapper;
import com.robinsonir.fittrack.security.jwt.JwtTokenUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private MemberMapper memberMapper;

    @Mock
    private MemberRepository memberRepository;

    @Mock
    private JwtTokenUtil jwtUtil;

    private AuthService authService;

    private MemberEntity memberEntity;
    private MemberDTO memberDTO;

    @BeforeEach
    void setUp() {
        authService = new AuthService(authenticationManager, memberMapper, memberRepository, jwtUtil);

        memberEntity = new MemberEntity();
        memberEntity.setId(1L);
        memberEntity.setName("John Doe");
        memberEntity.setEmail("john@example.com");
        memberEntity.setPassword("hashedPassword");
        memberEntity.setDateOfBirth(LocalDate.of(1995, 1, 1));
        memberEntity.setGender(Gender.MALE);

        memberDTO = new MemberDTO(
                1L, "John Doe", "john@example.com", Gender.MALE,
                LocalDate.of(1995, 1, 1), null, null, null, null, null,
                OffsetDateTime.now(), List.of("ROLE_USER"), "john@example.com",
                null, OffsetDateTime.now()
        );
    }

    @Test
    void loginReturnsAuthResponseWithTokens() {
        // Arrange
        AuthRequest request = new AuthRequest("john@example.com", "password123");
        Authentication authentication = mock(Authentication.class);

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(authentication);
        when(authentication.getPrincipal()).thenReturn(memberEntity);
        when(memberMapper.memberEntityToMemberDTO(memberEntity)).thenReturn(memberDTO);
        when(jwtUtil.generateToken("john@example.com", List.of("ROLE_USER"))).thenReturn("access-token");
        when(jwtUtil.generateRefreshToken("john@example.com")).thenReturn("refresh-token");

        // Act
        AuthResponse response = authService.login(request);

        // Assert
        assertThat(response.accessToken()).isEqualTo("access-token");
        assertThat(response.refreshToken()).isEqualTo("refresh-token");
        assertThat(response.member()).isEqualTo(memberDTO);

        verify(authenticationManager).authenticate(
                argThat(token ->
                        token.getPrincipal().equals("john@example.com") &&
                                token.getCredentials().equals("password123")
                )
        );
    }

    @Test
    void loginThrowsWhenCredentialsAreInvalid() {
        // Arrange
        AuthRequest request = new AuthRequest("john@example.com", "wrongPassword");

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(new BadCredentialsException("Bad credentials"));

        // Act & Assert
        assertThatThrownBy(() -> authService.login(request))
                .isInstanceOf(BadCredentialsException.class)
                .hasMessage("Bad credentials");

        verify(jwtUtil, never()).generateToken(anyString(), anyList());
        verify(jwtUtil, never()).generateRefreshToken(any());
    }

    @Test
    void refreshTokenReturnsNewAccessToken() {
        // Arrange
        String refreshToken = "valid-refresh-token";

        when(jwtUtil.getSubject(refreshToken)).thenReturn("john@example.com");
        when(memberRepository.findByEmail("john@example.com")).thenReturn(Optional.of(memberEntity));
        when(memberMapper.memberEntityToMemberDTO(memberEntity)).thenReturn(memberDTO);
        when(jwtUtil.generateToken("john@example.com", List.of("ROLE_USER"))).thenReturn("new-access-token");

        // Act
        RefreshResponse response = authService.refreshToken(refreshToken);

        // Assert
        assertThat(response.accessToken()).isEqualTo("new-access-token");
    }

    @Test
    void refreshTokenThrowsWhenUserNotFound() {
        // Arrange
        String refreshToken = "valid-refresh-token";

        when(jwtUtil.getSubject(refreshToken)).thenReturn("unknown@example.com");
        when(memberRepository.findByEmail("unknown@example.com")).thenReturn(Optional.empty());

        // Act & Assert
        assertThatThrownBy(() -> authService.refreshToken(refreshToken))
                .isInstanceOf(RuntimeException.class)
                .hasMessage("User not found");

        verify(jwtUtil, never()).generateToken(anyString(), anyList());
    }

    @Test
    void refreshTokenThrowsWhenSubjectDoesNotMatchUsername() {
        // Arrange
        String refreshToken = "tampered-token";
        MemberEntity differentMember = new MemberEntity();
        differentMember.setEmail("other@example.com");

        when(jwtUtil.getSubject(refreshToken)).thenReturn("john@example.com");
        when(memberRepository.findByEmail("john@example.com")).thenReturn(Optional.of(differentMember));

        // Act & Assert
        assertThatThrownBy(() -> authService.refreshToken(refreshToken))
                .isInstanceOf(RuntimeException.class)
                .hasMessage("Invalid token");

        verify(jwtUtil, never()).generateToken(anyString(), anyList());
    }
}
