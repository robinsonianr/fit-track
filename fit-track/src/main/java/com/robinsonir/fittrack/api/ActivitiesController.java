package com.robinsonir.fittrack.api;

import com.robinsonir.fittrack.data.repository.activities.ActivityDetailDTO;
import com.robinsonir.fittrack.data.repository.activities.ActivitySummaryDTO;
import com.robinsonir.fittrack.data.repository.activities.WorkoutDTO;
import com.robinsonir.fittrack.data.service.activities.ActivitiesService;
import com.robinsonir.fittrack.data.service.activities.ActivityCreationRequest;
import com.robinsonir.fittrack.data.service.activities.WorkoutCreationRequest;
import com.robinsonir.fittrack.data.service.workout.WorkoutService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Tag(name = "Activities API", description = "API for managing activities")
@RequestMapping(path = "api/v1/activities")
public class ActivitiesController {
    private final ActivitiesService activitiesService;
    private final WorkoutService workoutService;

    public ActivitiesController(final ActivitiesService activitiesService,
                                final WorkoutService workoutService) {
        this.activitiesService = activitiesService;
        this.workoutService = workoutService;
    }

    @Operation(summary = "Get Summary activities by MemberId and or Activity Type")
    @GetMapping("/member/{memberId}")
    public List<ActivitySummaryDTO> getMemberActivitiesByActivityType(
            @PathVariable final Long memberId, @RequestParam(required = false) final String activityType) {
        return activitiesService.getMemberActivitiesByActivityType(memberId, activityType);
    }

    @Operation(summary = "Get an activity detail by ID")
    @ApiResponse(responseCode = "404", description = "Activity not found")
    @GetMapping("/{activityId}")
    public ActivityDetailDTO getActivityDetail(@PathVariable final Long activityId) {
        return activitiesService.getActivityDetail(activityId);
    }

    @Operation(summary = "Create a new Activity")
    @ApiResponse(responseCode = "400", description = "Invalid request")
    @PostMapping
    public ActivityDetailDTO createActivity(
            @Parameter(description = "request") @RequestBody ActivityCreationRequest request) {
        switch (request.activityType()) {
            case "Workout" -> {
                WorkoutDTO workout = workoutService.addWorkout((WorkoutCreationRequest) request);
                ActivitySummaryDTO summary = activitiesService.addActivity(workout, request);
                return workout.withActivityId(summary.id());
            }
            default -> throw new IllegalStateException("Unexpected value: " + request.activityType());
        }
    }

    @Operation(summary = "Delete a workout")
    @ApiResponse(responseCode = "404", description = "Workout not found")
    @DeleteMapping("{activityId}")
    public ResponseEntity<Void> deleteActivity(
            @Parameter(description = "workoutId") @PathVariable final Long activityId) {
        ActivitySummaryDTO activity = activitiesService.getActivitySummary(activityId);
        switch (activity.activityType()) {
            case "Workout" -> workoutService.deleteWorkout(activity.sourceId());
            default -> throw new IllegalStateException("Unexpected value: " + activity.activityType());
        }

        activitiesService.deleteActivity(activityId);
        return ResponseEntity.noContent().build();
    }
}