package com.robinsonir.fittrack.data.repository.exercise;

import com.robinsonir.fittrack.data.repository.set.SetDTO;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

@Schema(name = "ExerciseDTO")
public record ExerciseDTO(
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
        String concentration,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        Boolean isBilateral,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        List<SetDTO> sets
){
}
