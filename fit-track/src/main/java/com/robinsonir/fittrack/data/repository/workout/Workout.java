package com.robinsonir.fittrack.data.repository.workout;

import com.robinsonir.fittrack.data.entity.exercise.ExerciseEntity;

import java.time.OffsetDateTime;
import java.util.Set;

public record Workout(
        Long id,
        Long customerId,
        String workoutType,
        Set<ExerciseEntity> exercises,
        Integer calories,
        Integer durationMinutes,
        OffsetDateTime workoutDate
) {
}
