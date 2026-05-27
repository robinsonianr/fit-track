package com.robinsonir.fittrack.security.auth;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "RefreshResponse")
public record RefreshResponse(
        String accessToken
) {
}
