package com.robinsonir.fittrack.data.repository.member;

import com.robinsonir.fittrack.data.Fitness;
import com.robinsonir.fittrack.data.Gender;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;

@Schema(name = "MemberDTO")
public record MemberDTO(
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        Long id,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        String name,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        String email,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        Gender gender,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        LocalDate dateOfBirth,
        Integer weight,
        Integer height,
        Integer weightGoal,
        Fitness fitness,
        Integer bodyFat,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        OffsetDateTime memberSince,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        List<String> roles,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        String username,
        String profileImageId,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        OffsetDateTime lastModifiedDate
) {
}
