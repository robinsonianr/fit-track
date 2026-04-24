package com.robinsonir.fittrack.data.service.workout;

import com.robinsonir.fittrack.data.entity.member.MemberEntity;
import com.robinsonir.fittrack.data.entity.workout.WorkoutEntity;
import com.robinsonir.fittrack.data.repository.member.MemberRepository;
import com.robinsonir.fittrack.data.repository.workout.WorkoutDTO;
import com.robinsonir.fittrack.data.repository.workout.WorkoutRepository;
import com.robinsonir.fittrack.exception.ResourceNotFoundException;
import com.robinsonir.fittrack.mappers.ExerciseMapper;
import com.robinsonir.fittrack.mappers.WorkoutMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.*;

@Service
public class WorkoutService {


    private final WorkoutMapper workoutMapper;
    private final ExerciseMapper exerciseMapper;

    private final WorkoutRepository workoutRepository;
    private final MemberRepository memberRepository;

    @Autowired
    public WorkoutService(WorkoutMapper workoutMapper,
                          WorkoutRepository workoutRepository, ExerciseMapper exerciseMapper,
                          MemberRepository memberRepository) {
        this.workoutMapper = workoutMapper;
        this.workoutRepository = workoutRepository;
        this.memberRepository = memberRepository;
        this.exerciseMapper = exerciseMapper;
    }


    public List<WorkoutDTO> getAllWorkouts() {
        List<WorkoutEntity> workoutEntities = new ArrayList<>(workoutRepository.findAll());
        return workoutMapper.convertWorkoutEntityListToWorkoutList(workoutEntities);
    }

    public WorkoutDTO getWorkout(Long id) {
        WorkoutEntity workoutEntity = workoutRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "workout with id [%s] not found".formatted(id)
                ));
        return workoutMapper.convertWorkoutEntityToWorkout(workoutEntity);
    }

    public List<WorkoutDTO> getAllWorkoutsByMemberId(Long id) {
        List<WorkoutEntity> workoutEntities = new ArrayList<>(workoutRepository.findAllWorkoutsByMemberId(id));
        return workoutMapper.convertWorkoutEntityListToWorkoutList(workoutEntities);
    }

    public WorkoutDTO addWorkout(WorkoutCreationRequest workoutCreationRequest) {

        WorkoutEntity newWorkout = new WorkoutEntity();
        newWorkout.setWorkoutType(workoutCreationRequest.workoutType());
        newWorkout.setTitle(workoutCreationRequest.title());
        newWorkout.setExercises(exerciseMapper.mapToExerciseEntities(workoutCreationRequest.exercises()));
        newWorkout.setCalories(workoutCreationRequest.calories());
        newWorkout.setVolume(workoutCreationRequest.volume());
        newWorkout.setDurationMinutes(workoutCreationRequest.durationMinutes());
        newWorkout.setWorkoutDate(OffsetDateTime.now());


        Optional<MemberEntity> memberEntity = memberRepository.findById(workoutCreationRequest.memberId());
        memberEntity.ifPresent(newWorkout::setMember);
        workoutRepository.save(newWorkout);
        return workoutMapper.convertWorkoutEntityToWorkout(newWorkout);
    }

    public void checkIfWorkoutExistsOrThrow(Long id) {
        if (!workoutRepository.existsById(id)) {
            throw new ResourceNotFoundException(
                    "workout with id [%s] not found".formatted(id)
            );
        }
    }


    public void deleteWorkout(Long id) {
        checkIfWorkoutExistsOrThrow(id);
        workoutRepository.deleteById(id);
    }
}
