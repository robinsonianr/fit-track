package com.robinsonir.fittrack.data.service.customer;

import com.robinsonir.fittrack.data.Gender;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.OffsetDateTime;

@Schema(name = "CustomerRegistrationRequest")
public record CustomerRegistrationRequest(
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        String name,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        String email,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        String password,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        Integer age,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        Gender gender
) {
}
