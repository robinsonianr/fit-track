package com.robinsonir.fittrack.data.service.member;

import com.robinsonir.fittrack.data.repository.member.MemberRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MemberUserDetailService implements UserDetailsService {

    private final MemberRepository memberRepository;

    public MemberUserDetailService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return memberRepository.findMemberByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "Username " + username + " not found"));
    }

}
