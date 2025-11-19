package com.robinsonir.fittrack.mappers;

import com.robinsonir.fittrack.data.entity.exercise.ExerciseEntity;
import com.robinsonir.fittrack.data.repository.exercise.Exercise;
import org.mapstruct.Mapping;

import java.util.Set;

@org.mapstruct.Mapper(config = FitTrackMapperConfig.class)
public interface ExerciseMapper {

    Set<Exercise> mapToExerciseSet(Set<ExerciseEntity> exerciseEntities);

    Set<ExerciseEntity> mapToExerciseEntities(Set<Exercise> exercises);

    @Mapping(target = "version", ignore = true)
    ExerciseEntity mapToExerciseEntity(Exercise exercise);
}
