package com.robinsonir.fittrack.data.service.customer;

import com.robinsonir.fittrack.data.Gender;

public record CustomerUpdateRequest(
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
