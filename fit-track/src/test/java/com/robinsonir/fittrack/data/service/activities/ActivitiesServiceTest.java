package com.robinsonir.fittrack.data.service.activities;

import com.robinsonir.fittrack.data.entity.activities.ActivityEntity;
import com.robinsonir.fittrack.data.repository.activities.ActivityDetailDTO;
import com.robinsonir.fittrack.data.repository.activities.ActivityRepository;
import com.robinsonir.fittrack.data.repository.activities.ActivitySummaryDTO;
import com.robinsonir.fittrack.data.repository.activities.WorkoutDTO;
import com.robinsonir.fittrack.data.repository.exercise.ExerciseDTO;
import com.robinsonir.fittrack.data.repository.set.SetDTO;
import com.robinsonir.fittrack.data.service.workout.WorkoutService;
import com.robinsonir.fittrack.exception.ResourceNotFoundException;
import com.robinsonir.fittrack.mappers.ActivityMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ActivitiesServiceTest {

    @Mock
    private WorkoutService workoutService;

    @Mock
    private ActivityRepository activityRepository;

    @Mock
    private ActivityMapper activityMapper;

    @InjectMocks
    private ActivitiesService activitiesService;

    @Test
    void getMemberActivitiesWithActivityType() {
        // Arrange
        Long memberId = 1L;
        String activityType = "Workout";
        ActivityEntity entity = createActivityEntity(memberId, activityType);
        List<ActivityEntity> entities = List.of(entity);
        ActivitySummaryDTO summaryDTO = createSummaryDTO(memberId, activityType);

        when(activityRepository.findByMemberIdAndActivityType(memberId, activityType)).thenReturn(entities);
        when(activityMapper.activityEntityListToActivitySummaryDTOList(entities)).thenReturn(List.of(summaryDTO));

        // Act
        List<ActivitySummaryDTO> result = activitiesService.getActivitySummariesByMemberId(memberId, activityType);

        // Assert
        assertEquals(1, result.size());
        assertEquals(summaryDTO, result.get(0));
        verify(activityRepository, times(1)).findByMemberIdAndActivityType(memberId, activityType);
        verify(activityRepository, never()).findByMemberId(memberId);
    }

    @Test
    void getMemberActivitiesWithoutActivityType() {
        // Arrange
        Long memberId = 1L;
        ActivityEntity entity = createActivityEntity(memberId, "Workout");
        List<ActivityEntity> entities = List.of(entity);
        ActivitySummaryDTO summaryDTO = createSummaryDTO(memberId, "Workout");

        when(activityRepository.findByMemberId(memberId)).thenReturn(entities);
        when(activityMapper.activityEntityListToActivitySummaryDTOList(entities)).thenReturn(List.of(summaryDTO));

        // Act
        List<ActivitySummaryDTO> result = activitiesService.getActivitySummariesByMemberId(memberId, null);

        // Assert
        assertEquals(1, result.size());
        assertEquals(summaryDTO, result.get(0));
        verify(activityRepository, never()).findByMemberIdAndActivityType(anyLong(), anyString());
        verify(activityRepository, times(1)).findByMemberId(memberId);
    }

    @Test
    void getActivityDetailForWorkout() {
        // Arrange
        Long activityId = 1L;
        Long sourceId = 10L;
        ActivityEntity entity = createActivityEntity(1L, "Workout");
        entity.setId(activityId);
        entity.setSourceId(sourceId);

        WorkoutDTO workoutDTO = new WorkoutDTO(sourceId, null, 1L, "Push Day", "Push",
                new HashSet<>(), 5000, 300, 60, OffsetDateTime.now());

        when(activityRepository.findById(activityId)).thenReturn(Optional.of(entity));
        when(workoutService.getWorkout(sourceId)).thenReturn(workoutDTO);

        // Act
        ActivityDetailDTO result = activitiesService.getActivityDetail(activityId);

        // Assert
        assertNotNull(result);
        assertInstanceOf(WorkoutDTO.class, result);
        assertEquals("Workout", result.activityType());
        assertEquals(activityId, ((WorkoutDTO) result).activityId());
        verify(activityRepository, times(1)).findById(activityId);
        verify(workoutService, times(1)).getWorkout(sourceId);
    }

    @Test
    void getActivityDetailThrowsWhenNotFound() {
        // Arrange
        Long activityId = 99L;
        when(activityRepository.findById(activityId)).thenReturn(Optional.empty());

        // Act and Assert
        assertThrows(ResourceNotFoundException.class,
                () -> activitiesService.getActivityDetail(activityId));
        verify(activityRepository, times(1)).findById(activityId);
        verify(workoutService, never()).getWorkout(anyLong());
    }

    @Test
    void getActivityDetailThrowsForUnknownType() {
        // Arrange
        Long activityId = 1L;
        ActivityEntity entity = createActivityEntity(1L, "Unknown");
        entity.setId(activityId);
        entity.setSourceId(5L);

        when(activityRepository.findById(activityId)).thenReturn(Optional.of(entity));

        // Act and Assert
        assertThrows(IllegalStateException.class,
                () -> activitiesService.getActivityDetail(activityId));
    }

    @Test
    void addActivity() {
        // Arrange
        OffsetDateTime now = OffsetDateTime.now();
        SetDTO setDTO = new SetDTO(1L, 1, 10, 225);
        ExerciseDTO exerciseDTO = new ExerciseDTO(1L, "Bench Press", "Barbell",
                "Flat bench press", "Chest", "Chest", false, List.of(setDTO));
        WorkoutDTO workoutDTO = new WorkoutDTO(10L, null, 1L, "Push Day", "Push",
                Set.of(exerciseDTO), 5000, 300, 60, now);
        WorkoutCreationRequest request = new WorkoutCreationRequest(1L, "Push Day", "Push", 60, Set.of(exerciseDTO));
        ActivitySummaryDTO expectedSummary = createSummaryDTO(1L, "Workout");

        when(activityRepository.save(any(ActivityEntity.class))).thenAnswer(inv -> inv.getArgument(0));
        when(activityMapper.activityEntityToActivitySummaryDTO(any(ActivityEntity.class))).thenReturn(expectedSummary);

        // Act
        ActivitySummaryDTO result = activitiesService.addActivity(workoutDTO, request);

        // Assert
        assertNotNull(result);
        verify(activityRepository, times(1)).save(any(ActivityEntity.class));
        verify(activityMapper, times(1)).activityEntityToActivitySummaryDTO(any(ActivityEntity.class));
    }

    @Test
    void getActivitySummary() {
        // Arrange
        Long activityId = 1L;
        ActivityEntity entity = createActivityEntity(1L, "Workout");
        entity.setId(activityId);
        ActivitySummaryDTO expectedSummary = createSummaryDTO(1L, "Workout");

        when(activityRepository.findById(activityId)).thenReturn(Optional.of(entity));
        when(activityMapper.activityEntityToActivitySummaryDTO(entity)).thenReturn(expectedSummary);

        // Act
        ActivitySummaryDTO result = activitiesService.getActivitySummary(activityId);

        // Assert
        assertEquals(expectedSummary, result);
        verify(activityRepository, times(1)).findById(activityId);
    }

    @Test
    void getActivitySummaryThrowsWhenNotFound() {
        // Arrange
        Long activityId = 99L;
        when(activityRepository.findById(activityId)).thenReturn(Optional.empty());

        // Act and Assert
        assertThrows(ResourceNotFoundException.class,
                () -> activitiesService.getActivitySummary(activityId));
    }

    @Test
    void deleteActivity() {
        // Arrange
        Long activityId = 1L;

        // Act
        activitiesService.deleteActivity(activityId);

        // Assert
        verify(activityRepository, times(1)).deleteById(activityId);
    }

    @Test
    void getHighlightReturnsHeaviestSet() {
        // Arrange
        SetDTO lightSet = new SetDTO(1L, 1, 10, 135);
        SetDTO heavySet = new SetDTO(2L, 2, 5, 225);
        ExerciseDTO exercise = new ExerciseDTO(1L, "Bench Press", "Barbell",
                "Flat bench press", "Chest", "Chest", false, List.of(lightSet, heavySet));
        WorkoutDTO workout = new WorkoutDTO(1L, null, 1L, "Push Day", "Push",
                Set.of(exercise), 5000, 300, 60, OffsetDateTime.now());

        // Act
        String highlight = activitiesService.getHighlight(workout);

        // Assert
        assertEquals("Bench Press 225x5", highlight);
    }

    @Test
    void getHighlightReturnsEmptyForNoExercises() {
        // Arrange
        WorkoutDTO workout = new WorkoutDTO(1L, null, 1L, "Push Day", "Push",
                new HashSet<>(), 0, 0, 60, OffsetDateTime.now());

        // Act
        String highlight = activitiesService.getHighlight(workout);

        // Assert
        assertEquals("", highlight);
    }

    private ActivityEntity createActivityEntity(Long memberId, String activityType) {
        ActivityEntity entity = new ActivityEntity();
        entity.setMemberId(memberId);
        entity.setActivityType(activityType);
        entity.setRoutineContext("Push Day");
        entity.setDurationMinutes(60);
        entity.setHighlight("Bench Press 225x5");
        entity.setHighlightIsPR(false);
        entity.setActivityTimestamp(OffsetDateTime.now());
        return entity;
    }

    private ActivitySummaryDTO createSummaryDTO(Long memberId, String activityType) {
        return new ActivitySummaryDTO(1L, memberId, 10L, activityType, "Push Day",
                60, "Bench Press 225x5", false, OffsetDateTime.now());
    }
}
