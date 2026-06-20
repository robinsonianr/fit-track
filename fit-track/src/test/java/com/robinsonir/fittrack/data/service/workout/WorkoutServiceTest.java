package com.robinsonir.fittrack.data.service.workout;

import com.robinsonir.fittrack.data.Gender;
import com.robinsonir.fittrack.data.entity.exercise.ExerciseEntity;
import com.robinsonir.fittrack.data.entity.member.MemberEntity;
import com.robinsonir.fittrack.data.entity.set.SetEntity;
import com.robinsonir.fittrack.data.entity.workout.WorkoutEntity;
import com.robinsonir.fittrack.data.repository.activities.WorkoutDTO;
import com.robinsonir.fittrack.data.repository.exercise.ExerciseDTO;
import com.robinsonir.fittrack.data.repository.member.MemberRepository;
import com.robinsonir.fittrack.data.repository.set.SetDTO;
import com.robinsonir.fittrack.data.repository.workout.WorkoutRepository;
import com.robinsonir.fittrack.data.service.activities.ActivitiesService;
import com.robinsonir.fittrack.data.service.activities.WorkoutCreationRequest;
import com.robinsonir.fittrack.exception.ResourceNotFoundException;
import com.robinsonir.fittrack.mappers.ExerciseMapper;
import com.robinsonir.fittrack.mappers.WorkoutMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class WorkoutServiceTest {

    @Mock
    private WorkoutRepository workoutRepository;

    @Mock
    private MemberRepository memberRepository;

    @Mock
    private WorkoutMapper workoutMapper;

    @Mock
    private ExerciseMapper exerciseMapper;

    @Mock
    private ActivitiesService activitiesService;

    @InjectMocks
    private WorkoutService workoutService;

    private MemberEntity member;

    @BeforeEach
    void setUp() {
        member = new MemberEntity();
        member.setId(1L);
        member.setName("John Doe");
        member.setEmail("john.doe@example.com");
        member.setPassword("password");
        member.setDateOfBirth(LocalDate.of(1995, 1, 1));
        member.setGender(Gender.MALE);
    }

    @Test
    void getWorkoutSuccess() {
        // Arrange
        Long workoutId = 1L;
        WorkoutEntity workoutEntity = new WorkoutEntity("Cardio", "Running", 500, 500, 60, OffsetDateTime.now(), null, member);
        WorkoutDTO expectedWorkout = new WorkoutDTO(workoutId, null, member.getId(), "Cardio", "Running", new HashSet<>(), 12000, 60, null, OffsetDateTime.now());

        when(workoutRepository.findById(workoutId)).thenReturn(Optional.of(workoutEntity));
        when(workoutMapper.convertWorkoutEntityToWorkout(workoutEntity)).thenReturn(expectedWorkout);

        // Act
        WorkoutDTO result = workoutService.getWorkout(workoutId);

        // Assert
        assertEquals(expectedWorkout, result);
        verify(workoutRepository, times(1)).findById(workoutId);
        verify(workoutMapper, times(1)).convertWorkoutEntityToWorkout(workoutEntity);
    }

    @Test
    void getWorkoutThrowsResourceNotFoundException() {
        // Arrange
        Long workoutId = 1L;
        when(workoutRepository.findById(workoutId)).thenReturn(Optional.empty());

        // Act and Assert
        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class,
                () -> workoutService.getWorkout(workoutId));

        assertEquals("workout with ID: [1] not found", exception.getMessage());
        verify(workoutRepository, times(1)).findById(workoutId);
        verify(workoutMapper, times(0)).convertWorkoutEntityToWorkout(any(WorkoutEntity.class));
    }

    @Test
    void addWorkout() {
        // Arrange
        member.setWeight(185.0);

        SetDTO setDTO = new SetDTO(null, 1, 10, 135);
        ExerciseDTO exerciseDTO = new ExerciseDTO(null, "Bench Press", "Barbell",
                "Flat bench press", "Chest", "Chest", false, List.of(setDTO));

        WorkoutCreationRequest workoutCreationRequest = new WorkoutCreationRequest(
                member.getId(), "Chest Day", "Strength", 60, Set.of(exerciseDTO)
        );

        SetEntity setEntity = new SetEntity();
        setEntity.setSetNumber(1);
        setEntity.setReps(10);
        setEntity.setWeight(135);

        ExerciseEntity exerciseEntity = new ExerciseEntity();
        exerciseEntity.setTitle("Bench Press");
        exerciseEntity.setEquipment("Barbell");
        exerciseEntity.setDescription("Flat bench press");
        exerciseEntity.setMuscleGroup("Chest");
        exerciseEntity.setConcentration("Chest");
        exerciseEntity.setIsBilateral(false);
        exerciseEntity.setSets(List.of(setEntity));

        when(memberRepository.findById(member.getId())).thenReturn(Optional.of(member));
        when(exerciseMapper.mapToExerciseEntities(workoutCreationRequest.exercises()))
                .thenReturn(Set.of(exerciseEntity));
        when(workoutRepository.save(any(WorkoutEntity.class))).thenAnswer(inv -> inv.getArgument(0));
        when(workoutMapper.convertWorkoutEntityToWorkout(any(WorkoutEntity.class)))
                .thenAnswer(inv -> {
                    WorkoutEntity saved = inv.getArgument(0);
                    return new WorkoutDTO(null, null, member.getId(), saved.getTitle(), saved.getWorkoutType(),
                            new HashSet<>(), saved.getVolume(), saved.getCalories(), saved.getDurationMinutes(),
                            saved.getWorkoutDate());
                });

        // Act
        WorkoutDTO result = workoutService.addWorkout(workoutCreationRequest);

        // Assert
        assertNotNull(result);
        assertEquals(1350, result.volume());
        assertNotNull(result.calories());
        verify(memberRepository, times(1)).findById(member.getId());
        verify(exerciseMapper, times(1)).mapToExerciseEntities(workoutCreationRequest.exercises());
        verify(workoutRepository, times(1)).save(any(WorkoutEntity.class));
    }

    @Test
    void checkIfWorkoutExistsOrThrowSuccess() {
        // Arrange
        Long workoutId = 1L;
        when(workoutRepository.existsById(workoutId)).thenReturn(true);

        // Act and Assert
        assertDoesNotThrow(() -> workoutService.checkIfWorkoutExistsOrThrow(workoutId));
        verify(workoutRepository, times(1)).existsById(workoutId);
    }

    @Test
    void checkIfWorkoutExistsOrThrowThrowsResourceNotFoundException() {
        // Arrange
        Long workoutId = 1L;
        when(workoutRepository.existsById(workoutId)).thenReturn(false);

        // Act and Assert
        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class,
                () -> workoutService.checkIfWorkoutExistsOrThrow(workoutId));

        assertEquals("workout with ID: [1] not found", exception.getMessage());
        verify(workoutRepository, times(1)).existsById(workoutId);
    }
}
