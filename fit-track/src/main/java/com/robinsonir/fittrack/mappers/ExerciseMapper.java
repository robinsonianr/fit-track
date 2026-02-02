package com.robinsonir.fittrack.mappers;

import com.robinsonir.fittrack.data.entity.exercise.ExerciseEntity;
import com.robinsonir.fittrack.data.repository.exercise.ExerciseDTO;
import org.mapstruct.Mapping;

import java.util.Set;

@org.mapstruct.Mapper(config = FitTrackMapperConfig.class)
public interface ExerciseMapper {

    Set<ExerciseDTO> mapToExerciseSet(Set<ExerciseEntity> exerciseEntities);

    Set<ExerciseEntity> mapToExerciseEntities(Set<ExerciseDTO> exercises);

    @Mapping(target = "version", ignore = true)
    ExerciseEntity mapToExerciseEntity(ExerciseDTO exercise);
}
