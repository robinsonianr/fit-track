package com.robinsonir.fittrack.security.auth;

import com.robinsonir.fittrack.data.entity.member.MemberEntity;
import com.robinsonir.fittrack.data.repository.member.MemberDTO;
import com.robinsonir.fittrack.data.repository.member.MemberRepository;
import com.robinsonir.fittrack.mappers.MemberMapper;
import com.robinsonir.fittrack.security.jwt.JwtTokenUtil;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private static final Logger LOGGER = LoggerFactory.getLogger(AuthService.class);

    private final AuthenticationManager authenticationManager;

    private final MemberMapper memberMapper;

    private final MemberRepository memberRepository;

    private final JwtTokenUtil jwtUtil;


    public AuthResponse login(AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(),
                        request.password()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        MemberEntity principal = (MemberEntity) authentication.getPrincipal();
        MemberDTO member = memberMapper.memberEntityToMemberDTO(principal);
        var accessToken = jwtUtil.generateToken(member.username(), member.roles());
        var refreshToken = jwtUtil.generateRefreshToken(member.username());
        return new AuthResponse(accessToken, refreshToken, member);
    }

    public RefreshResponse refreshToken(String refreshToken) {
        if (refreshToken == null || refreshToken.trim().isEmpty()) {
            throw new BadCredentialsException("Refresh token is required");
        }

        try {
            String subject = jwtUtil.getSubject(refreshToken);
            MemberEntity memberEntity = memberRepository.findByEmail(subject)
                    .orElseThrow(() -> {
                        LOGGER.warn("Token refresh attempt for non-existent user: {}", subject);
                        return new BadCredentialsException("Invalid refresh token");
                    });

            if (!subject.equals(memberEntity.getUsername())) {
                LOGGER.warn("Token refresh subject mismatch for user: {}", subject);
                throw new BadCredentialsException("Invalid refresh token");
            }

            MemberDTO member = memberMapper.memberEntityToMemberDTO(memberEntity);
            var accessToken = jwtUtil.generateToken(member.username(), member.roles());
            LOGGER.info("Successful token refresh for user: {}", subject);
            return new RefreshResponse(accessToken);
        } catch (JwtException ex) {
            LOGGER.warn("Invalid refresh token provided", ex);
            throw new BadCredentialsException("Invalid refresh token", ex);
        }
    }
}
