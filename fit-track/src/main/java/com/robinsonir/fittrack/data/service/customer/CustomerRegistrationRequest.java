package com.robinsonir.fittrack.data.service.customer;

import com.robinsonir.fittrack.data.Gender;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.OffsetDateTime;

@Schema(name = "CustomerRegistrationRequest")
public record CustomerRegistrationRequest(
        String name,
        String email,
        String password,
        Integer age,
        Gender gender,
        OffsetDateTime memberSince
) {
}
