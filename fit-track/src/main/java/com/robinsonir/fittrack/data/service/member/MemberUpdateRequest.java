package com.robinsonir.fittrack.data.service.member;

import com.robinsonir.fittrack.data.Gender;

public record MemberUpdateRequest(
      String name,
      String email,
      Integer age,
      Gender gender,
      Integer weight,
      Integer height,
      Integer weightGoal,
      String activity,
      Integer bodyFat
) {
}
