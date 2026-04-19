package com.robinsonir.fittrack.data.repository.workout;

import com.robinsonir.fittrack.data.repository.exercise.ExerciseDTO;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.OffsetDateTime;
import java.util.Set;

@Schema(name = "WorkoutDTO")
public record WorkoutDTO(
        Long id,
        Long customerId,
        String title,
        String workoutType,
        Set<ExerciseDTO> exercises,
        Integer volume,
        Integer calories,
        Integer durationMinutes,
        OffsetDateTime workoutDate
) {
}
