package com.robinsonir.fittrack.data.service.member;

import com.robinsonir.fittrack.data.Gender;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;

@Schema(name = "MemberRegistrationRequest")
public record MemberRegistrationRequest(
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        String name,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        String email,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        String password,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        LocalDate dateOfBirth,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        Gender gender
) {
}
