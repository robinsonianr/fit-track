package com.robinsonir.fittrack.data.repository.customer;

import com.robinsonir.fittrack.data.Gender;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.OffsetDateTime;
import java.util.List;

@Schema(name = "CustomerDTO")
public record CustomerDTO(
        Long id,
        String name,
        String email,
        Gender gender,
        Integer age,
        Integer weight,
        Integer height,
        Integer weightGoal,
        String activity,
        Integer bodyFat,
        OffsetDateTime memberSince,
        List<String> roles,
        String username,
        String profileImageId,
        OffsetDateTime lastModifiedDate
) {
}
