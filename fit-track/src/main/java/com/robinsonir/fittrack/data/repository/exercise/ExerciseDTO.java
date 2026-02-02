package com.robinsonir.fittrack.data.repository.exercise;

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
