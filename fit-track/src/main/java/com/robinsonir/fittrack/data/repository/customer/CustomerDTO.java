package com.robinsonir.fittrack.data.repository.customer;

import com.robinsonir.fittrack.data.Gender;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.OffsetDateTime;
import java.util.List;

@Schema(name = "CustomerDTO")
public record CustomerDTO(
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        Long id,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        String name,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        String email,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        Gender gender,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        Integer age,
        Integer weight,
        Integer height,
        Integer weightGoal,
        String activity,
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
