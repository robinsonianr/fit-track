package com.robinsonir.fittrack.mappers;

import com.robinsonir.fittrack.data.entity.member.MemberEntity;
import com.robinsonir.fittrack.data.entity.workout.WorkoutEntity;
import com.robinsonir.fittrack.data.repository.workout.WorkoutDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(config = FitTrackMapperConfig.class)
public interface WorkoutMapper {

    @Mapping(target = "memberId", source = "member")
    WorkoutDTO convertWorkoutEntityToWorkout(WorkoutEntity workoutEntity);


    @Mapping(target = "memberId", source = "member")
    List<WorkoutDTO> convertWorkoutEntityListToWorkoutList(List<WorkoutEntity> workoutEntities);


    default Long mapMemberId(MemberEntity member) {
        return member.getId();
    }
}

