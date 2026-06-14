package com.robinsonir.fittrack.data.service.workout;

import com.robinsonir.fittrack.data.repository.exercise.ExerciseDTO;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.Set;

public record WorkoutCreationRequest(
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        Long memberId,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        String title,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        String workoutType,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        Integer durationMinutes,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        Set<ExerciseDTO> exercises
) {
}
