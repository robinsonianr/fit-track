package com.robinsonir.fittrack.security.auth;

import com.robinsonir.fittrack.data.repository.member.MemberDTO;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "AuthResponse")
public record AuthResponse(
        String jwtToken,
        MemberDTO member
) {
}
