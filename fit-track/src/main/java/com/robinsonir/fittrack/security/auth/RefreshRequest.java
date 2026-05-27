package com.robinsonir.fittrack.security.auth;

public record RefreshRequest(
        String refreshToken
) {
}
