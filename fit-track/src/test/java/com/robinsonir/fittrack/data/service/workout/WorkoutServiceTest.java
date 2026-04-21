package com.robinsonir.fittrack.data.service.workout;

import com.robinsonir.fittrack.data.Gender;
import com.robinsonir.fittrack.data.entity.customer.CustomerEntity;
import com.robinsonir.fittrack.data.entity.workout.WorkoutEntity;
import com.robinsonir.fittrack.data.repository.customer.CustomerRepository;
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
    private CustomerRepository customerRepository;

    @Mock
    private WorkoutMapper workoutMapper;

    @Mock
    private ExerciseMapper exerciseMapper;

    @InjectMocks
    private WorkoutService workoutService;

    private CustomerEntity customer;

    @BeforeEach
    void setUp() {
        customer = new CustomerEntity();
        customer.setId(1L);
        customer.setName("John Doe");
        customer.setEmail("john.doe@example.com");
        customer.setPassword("password");
        customer.setAge(30);
        customer.setGender(Gender.MALE);
    }

    @Test
    void getAllWorkouts() {
        // Arrange
        WorkoutEntity workoutEntity1 = new WorkoutEntity("Cardio","Running", 500,  12000, 60, OffsetDateTime.now(), new HashSet<>(), customer);
        workoutEntity1.setId(1L);
        WorkoutEntity workoutEntity2 = new WorkoutEntity("Cardio","Cycling", 300, 12000, 45, OffsetDateTime.now(), new HashSet<>(), customer);
        workoutEntity2.setId(2L);

        List<WorkoutEntity> workoutList = new ArrayList<>();
        workoutList.add(workoutEntity1);
        workoutList.add(workoutEntity2);
        when(workoutRepository.findAllWorkouts()).thenReturn(workoutList);

        WorkoutDTO workoutDTO1 = new WorkoutDTO(1L, customer.getId(), "Cardio", "Running", new HashSet<>(), 12000, 500, 50, OffsetDateTime.now());
        WorkoutDTO workoutDTO2 = new WorkoutDTO(2L, customer.getId(), "Cardio", "Cycling", new HashSet<>(), 12000, 600, 60, OffsetDateTime.now());
        List<WorkoutDTO> workouts = new ArrayList<>();
        workouts.add(workoutDTO1);
        workouts.add(workoutDTO2);

        when(workoutMapper.convertWorkoutEntityListToWorkoutList(workoutList)).thenReturn(workouts);

        // Act
        List<WorkoutDTO> result = workoutService.getAllWorkouts();

        // Assert
        assertEquals(2, result.size());
        assertEquals(List.of(workoutDTO1, workoutDTO2), result);
        verify(workoutRepository, times(1)).findAllWorkouts();
        verify(workoutMapper, times(1)).convertWorkoutEntityListToWorkoutList(workoutList);
    }

    @Test
    void getWorkoutSuccess() {
        // Arrange
        Long workoutId = 1L;
        WorkoutEntity workoutEntity = new WorkoutEntity("Cardio","Running", 500, 12000, 60, OffsetDateTime.now(), null, customer);
        WorkoutDTO expectedWorkout = new WorkoutDTO(workoutId, customer.getId(),"Cardio", "Running", new HashSet<>(), 12000, 60, null, OffsetDateTime.now());

        when(workoutRepository.findWorkoutById(workoutId)).thenReturn(Optional.of(workoutEntity));
        when(workoutMapper.convertWorkoutEntityToWorkout(workoutEntity)).thenReturn(expectedWorkout);

        // Act
        WorkoutDTO result = workoutService.getWorkout(workoutId);

        // Assert
        assertEquals(expectedWorkout, result);
        verify(workoutRepository, times(1)).findWorkoutById(workoutId);
        verify(workoutMapper, times(1)).convertWorkoutEntityToWorkout(workoutEntity);
    }

    @Test
    void getWorkoutThrowsResourceNotFoundException() {
        // Arrange
        Long workoutId = 1L;
        when(workoutRepository.findWorkoutById(workoutId)).thenReturn(Optional.empty());

        // Act and Assert
        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class,
                () -> workoutService.getWorkout(workoutId));

        assertEquals("workout with id [1] not found", exception.getMessage());
        verify(workoutRepository, times(1)).findWorkoutById(workoutId);
        verify(workoutMapper, times(0)).convertWorkoutEntityToWorkout(any(WorkoutEntity.class));
    }

    @Test
    void addWorkout() {
        // Arrange
        WorkoutCreationRequest workoutCreationRequest = new WorkoutCreationRequest(customer.getId(), "Cardio", new HashSet<>(), "Swimming", 12000, 400, 60);

        WorkoutEntity newWorkout = new WorkoutEntity();
        newWorkout.setTitle(workoutCreationRequest.title());
        newWorkout.setWorkoutType(workoutCreationRequest.workoutType());
        newWorkout.setExercises(exerciseMapper.mapToExerciseEntities(workoutCreationRequest.exercises()));
        newWorkout.setCalories(workoutCreationRequest.calories());
        newWorkout.setDurationMinutes(workoutCreationRequest.durationMinutes());

        Optional<CustomerEntity> cust = customerRepository.findCustomerById(customer.getId());
        cust.ifPresent(newWorkout::setCustomer);

        when(workoutRepository.save(any(WorkoutEntity.class))).thenReturn(newWorkout);

        // Act
        workoutService.addWorkout(workoutCreationRequest);

        // Assert
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
