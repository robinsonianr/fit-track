package com.robinsonir.fittrack.data.service.workout;

import com.robinsonir.fittrack.data.entity.customer.CustomerEntity;
import com.robinsonir.fittrack.data.repository.exercise.Exercise;

import java.time.OffsetDateTime;
import java.util.Set;

public record WorkoutCreationRequest(
        CustomerEntity customer,
        Set<Exercise> exercises,
        String workoutType,
        Integer calories,
        Integer durationMinutes,
        OffsetDateTime workoutDate
) {
}
