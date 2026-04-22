package com.robinsonir.fittrack.data.service.workout;

import com.robinsonir.fittrack.data.repository.exercise.ExerciseDTO;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.Set;

public record WorkoutCreationRequest(
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        Long customerId,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        String title,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        Set<ExerciseDTO> exercises,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        String workoutType,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        Integer volume,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        Integer calories,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        Integer durationMinutes
) {
}
