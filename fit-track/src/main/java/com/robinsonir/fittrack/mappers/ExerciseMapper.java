package com.robinsonir.fittrack.mappers;

import com.robinsonir.fittrack.data.entity.exercise.ExerciseEntity;
import com.robinsonir.fittrack.data.entity.set.SetEntity;
import com.robinsonir.fittrack.data.repository.exercise.ExerciseDTO;
import com.robinsonir.fittrack.data.repository.set.SetDTO;
import org.mapstruct.Mapping;

import java.util.Set;

@org.mapstruct.Mapper(config = FitTrackMapperConfig.class)
public interface ExerciseMapper {
    Set<ExerciseEntity> mapToExerciseEntities(Set<ExerciseDTO> exercises);

    @Mapping(target = "version", ignore = true)
    ExerciseEntity mapToExerciseEntity(ExerciseDTO exercise);

    @Mapping(target = "version", ignore = true)
    SetEntity mapToSetEntity(SetDTO set);
}
