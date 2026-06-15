package com.robinsonir.fittrack.data.service.member;

import com.robinsonir.fittrack.data.Fitness;
import com.robinsonir.fittrack.data.Gender;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Past;

import java.time.LocalDate;

@Schema(name = "MemberUpdateRequest")
public record MemberUpdateRequest(
        String name,
        String email,
        @Past(message = "Date of birth must be in the past")
        LocalDate dateOfBirth,
        Gender gender,
        Double weight,
        Integer height,
        Double weightGoal,
        Fitness fitness,
        Double bodyFat
) {
}
