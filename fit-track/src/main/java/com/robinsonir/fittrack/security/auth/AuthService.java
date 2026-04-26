package com.robinsonir.fittrack.security.auth;

import com.robinsonir.fittrack.data.entity.member.MemberEntity;
import com.robinsonir.fittrack.data.repository.member.MemberDTO;
import com.robinsonir.fittrack.mappers.MemberMapper;
import com.robinsonir.fittrack.security.jwt.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;

    private final MemberMapper memberMapper;

    private final JwtTokenUtil jwtUtil;


    public AuthResponse login(AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(),
                        request.password()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        MemberEntity principal = (MemberEntity) authentication.getPrincipal();
        MemberDTO member = memberMapper.memberEntityToMemberDTO(principal);
        var token = jwtUtil.generateToken(member.username(), member.roles());
        return new AuthResponse(token, member);
    }
}
