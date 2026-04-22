package com.robinsonir.fittrack.messages;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Standard success response carrying a stable key and a human-readable message")
public record ApiMessage(
        @Schema(description = "Stable identifier for i18n or programmatic branching", example = "customer.updated")
        String key,
        @Schema(description = "Human-readable success message", example = "Customer updated successfully")
        String message
) {
    public static ApiMessage of(String key, String message) {
        return new ApiMessage(key, message);
    }
}
