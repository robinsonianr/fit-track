package com.robinsonir.fittrack.data.repository.workout;

import com.robinsonir.fittrack.data.entity.exercise.ExerciseEntity;

import java.time.OffsetDateTime;
import java.util.Set;

public record WorkoutDTO(
        Long id,
        Long customerId,
        String title,
        String workoutType,
        Set<ExerciseEntity> exercises,
        Integer volume,
        Integer calories,
        Integer durationMinutes,
        OffsetDateTime workoutDate
) {
}
