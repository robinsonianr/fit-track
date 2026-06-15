package com.robinsonir.fittrack.data.service.workout;

import com.robinsonir.fittrack.data.entity.exercise.ExerciseEntity;
import com.robinsonir.fittrack.data.entity.member.MemberEntity;
import com.robinsonir.fittrack.data.entity.set.SetEntity;
import com.robinsonir.fittrack.data.entity.workout.WorkoutEntity;
import com.robinsonir.fittrack.data.repository.member.MemberRepository;
import com.robinsonir.fittrack.data.repository.workout.WorkoutDTO;
import com.robinsonir.fittrack.data.repository.workout.WorkoutRepository;
import com.robinsonir.fittrack.exception.ResourceNotFoundException;
import com.robinsonir.fittrack.mappers.ExerciseMapper;
import com.robinsonir.fittrack.mappers.WorkoutMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class WorkoutService {


    private static final Logger LOGGER = LoggerFactory.getLogger(WorkoutService.class);
    private final WorkoutMapper workoutMapper;
    private final ExerciseMapper exerciseMapper;
    private final WorkoutRepository workoutRepository;
    private final MemberRepository memberRepository;

    @Autowired
    public WorkoutService(final WorkoutMapper workoutMapper,
                          final WorkoutRepository workoutRepository,
                          final ExerciseMapper exerciseMapper,
                          final MemberRepository memberRepository) {
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
                        "workout with ID: [%s] not found".formatted(id)
                ));
        return workoutMapper.convertWorkoutEntityToWorkout(workoutEntity);
    }

    public List<WorkoutDTO> getAllWorkoutsByMemberId(Long id) {
        List<WorkoutEntity> workoutEntities = new ArrayList<>(workoutRepository.findAllWorkoutsByMemberId(id));
        return workoutMapper.convertWorkoutEntityListToWorkoutList(workoutEntities);
    }

    public WorkoutDTO addWorkout(WorkoutCreationRequest workoutCreationRequest) {
        Optional<MemberEntity> memberEntity = memberRepository.findById(workoutCreationRequest.memberId());

        WorkoutEntity newWorkout = new WorkoutEntity();
        if (memberEntity.isPresent()) {
            newWorkout.setWorkoutType(workoutCreationRequest.workoutType());
            newWorkout.setTitle(workoutCreationRequest.title());
            newWorkout.setExercises(exerciseMapper.mapToExerciseEntities(workoutCreationRequest.exercises()));
            newWorkout.setDurationMinutes(workoutCreationRequest.durationMinutes());
            newWorkout.setWorkoutDate(OffsetDateTime.now());
            newWorkout.setVolume(calculateVolume(newWorkout.getExercises()));
            newWorkout.setCalories(calculateCalories(memberEntity.get().getWeight(), newWorkout.getDurationMinutes()));
        }

        memberEntity.ifPresent(newWorkout::setMember);
        workoutRepository.save(newWorkout);
        LOGGER.info("Workout created successfully");
        return workoutMapper.convertWorkoutEntityToWorkout(newWorkout);
    }

    public void checkIfWorkoutExistsOrThrow(Long id) {
        if (!workoutRepository.existsById(id)) {
            throw new ResourceNotFoundException(
                    "workout with ID: [%s] not found".formatted(id)
            );
        }
    }


    public void deleteWorkout(Long id) {
        checkIfWorkoutExistsOrThrow(id);
        workoutRepository.deleteById(id);
        LOGGER.info("Workout deleted successfully");
    }


    private Integer calculateVolume(Set<ExerciseEntity> exercises) {
        int volume = 0;
        for (ExerciseEntity exercise : exercises) {
            boolean isBilateral = exercise.getIsBilateral();
            for (SetEntity set : exercise.getSets()) {
                if (isBilateral) {
                    volume += set.getReps() * set.getWeight() * 2;
                } else {
                    volume += set.getReps() * set.getWeight();
                }
            }
        }
        return volume;
    }

    private Integer calculateCalories(Double weight, Integer durationMinutes) {
        return (int) Math.floor(3.5 * 0.00795 * weight * durationMinutes);
    }
}
