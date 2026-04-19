package com.robinsonir.fittrack.data.repository.exercise;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema
public record ExerciseDTO(
        Long id,
        String title,
        String equipment,
        String description,
        String muscleGroup,
        Integer reps,
        Integer sets,
        Integer weightPerRep
){
}
