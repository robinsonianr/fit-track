package com.robinsonir.fittrack.data.service.workout;

import com.robinsonir.fittrack.data.Gender;
import com.robinsonir.fittrack.data.entity.member.MemberEntity;
import com.robinsonir.fittrack.data.entity.workout.WorkoutEntity;
import com.robinsonir.fittrack.data.repository.member.MemberRepository;
import com.robinsonir.fittrack.data.repository.workout.WorkoutDTO;
import com.robinsonir.fittrack.data.repository.workout.WorkoutRepository;
import com.robinsonir.fittrack.exception.ResourceNotFoundException;
import com.robinsonir.fittrack.mappers.ExerciseMapper;
import com.robinsonir.fittrack.mappers.WorkoutMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

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
        member.setAge(30);
        member.setGender(Gender.MALE);
    }

    @Test
    void getAllWorkouts() {
        // Arrange
        WorkoutEntity workoutEntity1 = new WorkoutEntity("Cardio", "Running", 500, 12000, 60, OffsetDateTime.now(), new HashSet<>(), member);
        workoutEntity1.setId(1L);
        WorkoutEntity workoutEntity2 = new WorkoutEntity("Cardio", "Cycling", 300, 12000, 45, OffsetDateTime.now(), new HashSet<>(), member);
        workoutEntity2.setId(2L);

        List<WorkoutEntity> workoutList = new ArrayList<>();
        workoutList.add(workoutEntity1);
        workoutList.add(workoutEntity2);
        when(workoutRepository.findAll()).thenReturn(workoutList);

        WorkoutDTO workoutDTO1 = new WorkoutDTO(1L, member.getId(), "Cardio", "Running", new HashSet<>(), 12000, 500, 50, OffsetDateTime.now());
        WorkoutDTO workoutDTO2 = new WorkoutDTO(2L, member.getId(), "Cardio", "Cycling", new HashSet<>(), 12000, 600, 60, OffsetDateTime.now());
        List<WorkoutDTO> workouts = new ArrayList<>();
        workouts.add(workoutDTO1);
        workouts.add(workoutDTO2);

        when(workoutMapper.convertWorkoutEntityListToWorkoutList(anyList())).thenReturn(workouts);

        // Act
        List<WorkoutDTO> result = workoutService.getAllWorkouts();

        // Assert
        assertEquals(2, result.size());
        assertEquals(List.of(workoutDTO1, workoutDTO2), result);
        verify(workoutRepository, times(1)).findAll();
        verify(workoutMapper, times(1)).convertWorkoutEntityListToWorkoutList(anyList());
    }

    @Test
    void getWorkoutSuccess() {
        // Arrange
        Long workoutId = 1L;
        WorkoutEntity workoutEntity = new WorkoutEntity("Cardio", "Running", 500, 12000, 60, OffsetDateTime.now(), null, member);
        WorkoutDTO expectedWorkout = new WorkoutDTO(workoutId, member.getId(), "Cardio", "Running", new HashSet<>(), 12000, 60, null, OffsetDateTime.now());

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

        assertEquals("workout with id [1] not found", exception.getMessage());
        verify(workoutRepository, times(1)).findById(workoutId);
        verify(workoutMapper, times(0)).convertWorkoutEntityToWorkout(any(WorkoutEntity.class));
    }

    @Test
    void addWorkout() {
        // Arrange
        WorkoutCreationRequest workoutCreationRequest = new WorkoutCreationRequest(
                member.getId(), "Cardio", new HashSet<>(), "Swimming", 12000, 400, 60
        );

        when(memberRepository.findById(member.getId())).thenReturn(Optional.of(member));
        when(workoutRepository.save(any(WorkoutEntity.class))).thenAnswer(inv -> inv.getArgument(0));

        // Act
        workoutService.addWorkout(workoutCreationRequest);

        // Assert
        verify(memberRepository, times(1)).findById(member.getId());
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

        assertEquals("workout with id [1] not found", exception.getMessage());
        verify(workoutRepository, times(1)).existsById(workoutId);
    }
}
