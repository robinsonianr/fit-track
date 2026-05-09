package com.robinsonir.fittrack.data.service.member;

import com.robinsonir.fittrack.data.Gender;
import jakarta.validation.constraints.PastOrPresent;

import java.time.LocalDate;

public record MemberUpdateRequest(
      String name,
      String email,
      @PastOrPresent(message = "Date of birth must be in the past")
      LocalDate dateOfBirth,
      Gender gender,
      Integer weight,
      Integer height,
      Integer weightGoal,
      String activity,
      Integer bodyFat
) {
}
