package com.robinsonir.fittrack.data.repository.exercise;

public record Exercise(
        Long id,
        String title,
        String description,
        String muscleGroup,
        Integer reps,
        Integer sets,
        Integer weightPerRep
){
}
