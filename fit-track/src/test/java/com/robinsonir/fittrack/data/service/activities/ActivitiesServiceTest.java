package com.robinsonir.fittrack.data.service.activities;

import com.robinsonir.fittrack.data.entity.activities.ActivityEntity;
import com.robinsonir.fittrack.data.repository.activities.ActivityDetailDTO;
import com.robinsonir.fittrack.data.repository.activities.ActivityRepository;
import com.robinsonir.fittrack.data.repository.activities.ActivitySummaryDTO;
import com.robinsonir.fittrack.data.repository.activities.WorkoutDTO;
import com.robinsonir.fittrack.data.entity.exercise.ExerciseEntity;
import com.robinsonir.fittrack.data.entity.set.SetEntity;
import com.robinsonir.fittrack.data.entity.workout.WorkoutEntity;
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
        List<ActivitySummaryDTO> result = activitiesService.getMemberActivitiesByActivityType(memberId, activityType);

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
        List<ActivitySummaryDTO> result = activitiesService.getMemberActivitiesByActivityType(memberId, null);

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

        WorkoutDTO workoutDTO = new WorkoutDTO(sourceId, 1L, "Push Day", "Push",
                new HashSet<>(), 5000, 300, 60, OffsetDateTime.now());

        when(activityRepository.findById(activityId)).thenReturn(Optional.of(entity));
        when(workoutService.getWorkout(sourceId)).thenReturn(workoutDTO);

        // Act
        ActivityDetailDTO result = activitiesService.getActivityDetail(activityId);

        // Assert
        assertNotNull(result);
        assertInstanceOf(WorkoutDTO.class, result);
        assertEquals("Workout", result.activityType());
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
        ActivityEntity entity = createActivityEntity(1L, "Workout");
        when(activityRepository.save(entity)).thenReturn(entity);

        // Act
        activitiesService.addActivity(entity);

        // Assert
        verify(activityRepository, times(1)).save(entity);
    }

    @Test
    void getHighlightReturnsHeaviestSet() {
        // Arrange
        SetEntity lightSet = new SetEntity();
        lightSet.setSetNumber(1);
        lightSet.setReps(10);
        lightSet.setWeight(135);

        SetEntity heavySet = new SetEntity();
        heavySet.setSetNumber(2);
        heavySet.setReps(5);
        heavySet.setWeight(225);

        ExerciseEntity exercise = new ExerciseEntity();
        exercise.setTitle("Bench Press");
        exercise.setEquipment("Barbell");
        exercise.setDescription("Flat bench press");
        exercise.setMuscleGroup("Chest");
        exercise.setConcentration("Chest");
        exercise.setIsBilateral(false);
        exercise.setSets(List.of(lightSet, heavySet));

        WorkoutEntity workout = new WorkoutEntity();
        workout.setExercises(Set.of(exercise));

        // Act
        String highlight = activitiesService.getHighlight(workout);

        // Assert
        assertEquals("Bench Press 225x5", highlight);
    }

    @Test
    void getHighlightReturnsEmptyForNoExercises() {
        // Arrange
        WorkoutEntity workout = new WorkoutEntity();
        workout.setExercises(new HashSet<>());

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
