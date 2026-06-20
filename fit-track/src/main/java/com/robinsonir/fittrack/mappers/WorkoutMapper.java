package com.robinsonir.fittrack.mappers;

import com.robinsonir.fittrack.data.entity.workout.WorkoutEntity;
import com.robinsonir.fittrack.data.repository.activities.WorkoutDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(config = FitTrackMapperConfig.class)
public interface WorkoutMapper {
    @Mapping(target = "memberId", source = "member.id")
    @Mapping(target = "workoutId", source = "id")
    @Mapping(target = "withActivityId", ignore = true)
    @Mapping(target = "activityId", ignore = true)
    WorkoutDTO convertWorkoutEntityToWorkout(WorkoutEntity workoutEntity);

}

