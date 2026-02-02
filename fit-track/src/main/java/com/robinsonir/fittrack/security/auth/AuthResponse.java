package com.robinsonir.fittrack.security.auth;

public record AuthResponse(
        String jwtToken,
        Long customerId
) {
}
