package com.robinsonir.fittrack.data.repository.exercise;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema
public record ExerciseDTO(
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        Long id,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        String title,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        String equipment,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        String description,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        String muscleGroup,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        Integer reps,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        Integer sets,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        Integer weightPerRep
){
}
