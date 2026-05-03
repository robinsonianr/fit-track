package com.robinsonir.fittrack.data.service.member;

import com.robinsonir.fittrack.data.Gender;

import java.time.LocalDate;

public record MemberUpdateRequest(
      String name,
      String email,
      LocalDate dateOfBirth,
      Gender gender,
      Integer weight,
      Integer height,
      Integer weightGoal,
      String activity,
      Integer bodyFat
) {
}
