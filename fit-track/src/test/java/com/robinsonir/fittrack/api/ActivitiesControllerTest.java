package com.robinsonir.fittrack.api;

import com.robinsonir.fittrack.data.repository.activities.ActivityDetailDTO;
import com.robinsonir.fittrack.data.repository.activities.ActivitySummaryDTO;
import com.robinsonir.fittrack.data.repository.activities.WorkoutDTO;
import com.robinsonir.fittrack.data.service.activities.ActivitiesService;
import com.robinsonir.fittrack.exception.ResourceNotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ActivitiesControllerTest {

    @Mock
    private ActivitiesService activitiesService;

    @InjectMocks
    private ActivitiesController activitiesController;

    @Test
    void getMemberActivitiesWithoutActivityType() {
        // Arrange
        Long memberId = 1L;
        ActivitySummaryDTO summary = new ActivitySummaryDTO(1L, memberId, 10L, "Workout",
                "Push Day", 60, "Bench Press 225x5", false, OffsetDateTime.now());

        when(activitiesService.getMemberActivitiesByActivityType(memberId, null))
                .thenReturn(List.of(summary));

        // Act
        List<ActivitySummaryDTO> result = activitiesController.getMemberActivitiesByActivityType(memberId, null);

        // Assert
        assertEquals(1, result.size());
        assertEquals(summary, result.get(0));
        verify(activitiesService, times(1)).getMemberActivitiesByActivityType(memberId, null);
    }

    @Test
    void getMemberActivitiesWithActivityType() {
        // Arrange
        Long memberId = 1L;
        String activityType = "Workout";
        ActivitySummaryDTO summary = new ActivitySummaryDTO(1L, memberId, 10L, activityType,
                "Leg Day", 63, "Squat 275x5", false, OffsetDateTime.now());

        when(activitiesService.getMemberActivitiesByActivityType(memberId, activityType))
                .thenReturn(List.of(summary));

        // Act
        List<ActivitySummaryDTO> result = activitiesController.getMemberActivitiesByActivityType(memberId, activityType);

        // Assert
        assertEquals(1, result.size());
        assertEquals("Workout", result.get(0).activityType());
        verify(activitiesService, times(1)).getMemberActivitiesByActivityType(memberId, activityType);
    }

    @Test
    void getMemberActivitiesReturnsEmptyList() {
        // Arrange
        Long memberId = 99L;
        when(activitiesService.getMemberActivitiesByActivityType(memberId, null))
                .thenReturn(List.of());

        // Act
        List<ActivitySummaryDTO> result = activitiesController.getMemberActivitiesByActivityType(memberId, null);

        // Assert
        assertTrue(result.isEmpty());
    }

    @Test
    void getActivityDetailReturnsWorkoutDTO() {
        // Arrange
        Long activityId = 1L;
        WorkoutDTO workoutDTO = new WorkoutDTO(10L, activityId, 1L, "Push Day", "Push",
                new HashSet<>(), 5000, 300, 60, OffsetDateTime.now());

        when(activitiesService.getActivityDetail(activityId)).thenReturn(workoutDTO);

        // Act
        ActivityDetailDTO result = activitiesController.getActivityDetail(activityId);

        // Assert
        assertNotNull(result);
        assertInstanceOf(WorkoutDTO.class, result);
        assertEquals("Workout", result.activityType());
        assertEquals(activityId, ((WorkoutDTO) result).activityId());
        verify(activitiesService, times(1)).getActivityDetail(activityId);
    }

    @Test
    void getActivityDetailThrowsWhenNotFound() {
        // Arrange
        Long activityId = 99L;
        when(activitiesService.getActivityDetail(activityId))
                .thenThrow(new ResourceNotFoundException("Activity not found"));

        // Act and Assert
        assertThrows(ResourceNotFoundException.class,
                () -> activitiesController.getActivityDetail(activityId));
    }
}
