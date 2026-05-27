package com.robinsonir.fittrack.security.auth;

import com.robinsonir.fittrack.data.entity.member.MemberEntity;
import com.robinsonir.fittrack.data.repository.member.MemberDTO;
import com.robinsonir.fittrack.data.repository.member.MemberRepository;
import com.robinsonir.fittrack.mappers.MemberMapper;
import com.robinsonir.fittrack.security.jwt.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

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
        String subject = jwtUtil.getSubject(refreshToken);
        // Load the user directly from the database
        MemberEntity memberEntity = memberRepository.findByEmail(subject)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!subject.equals(memberEntity.getUsername())) {
            throw new RuntimeException("Invalid token");
        }

        MemberDTO member = memberMapper.memberEntityToMemberDTO(memberEntity);
        var accessToken = jwtUtil.generateToken(member.username(), member.roles());
        return new RefreshResponse(accessToken);
    }
}
