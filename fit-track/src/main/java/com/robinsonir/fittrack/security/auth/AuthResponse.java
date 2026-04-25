package com.robinsonir.fittrack.security.auth;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "AuthResponse")
public record AuthResponse(
        String jwtToken,
        Long memberId
) {
}
