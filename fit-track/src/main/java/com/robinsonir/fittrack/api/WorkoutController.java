package com.robinsonir.fittrack.api;

import com.robinsonir.fittrack.data.repository.workout.WorkoutDTO;
import com.robinsonir.fittrack.data.service.workout.WorkoutCreationRequest;
import com.robinsonir.fittrack.data.service.workout.WorkoutService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@Tag(name = "Workouts API", description = "API for managing workouts")
@RequestMapping(path = "api/v1/workouts")
public class WorkoutController {

    private final WorkoutService workoutService;

    public WorkoutController(WorkoutService workoutService) {
        this.workoutService = workoutService;
    }

    @Operation(summary = "Get all workouts")
    @GetMapping
    public List<WorkoutDTO> getAllWorkouts() {
        return workoutService.getAllWorkouts();
    }

    @Operation(summary = "Get a workout by ID")
    @ApiResponse(responseCode = "404", description = "Workout not found")
    @GetMapping("{workoutId}")
    public WorkoutDTO getWorkout(
            @Parameter(description = "workoutId") @PathVariable final Long workoutId) {
        return workoutService.getWorkout(workoutId);
    }

    @Operation(summary = "Get all workouts for a member")
    @ApiResponse(responseCode = "404", description = "Member not found")
    @GetMapping("log/{memberId}")
    public List<WorkoutDTO> getAllWorkoutsByMemberId(
            @Parameter(description = "memberId") @PathVariable final Long memberId) {
        return workoutService.getAllWorkoutsByMemberId(memberId);
    }

    @Operation(summary = "Create a new workout")
    @ApiResponse(responseCode = "400", description = "Invalid request")
    @PostMapping
    public ResponseEntity<WorkoutDTO> createWorkout(
            @Parameter(description = "request") @RequestBody WorkoutCreationRequest request) {
        WorkoutDTO created = workoutService.addWorkout(request);
        URI location = URI.create("/api/v1/workouts/" + created.id());

        return ResponseEntity.created(location).body(created);

    }

    @Operation(summary = "Delete a workout")
    @ApiResponse(responseCode = "404", description = "Workout not found")
    @DeleteMapping("{workoutId}")
    public ResponseEntity<Void> deleteWorkout(
            @Parameter(description = "workoutId") @PathVariable final Long workoutId) {
        workoutService.deleteWorkout(workoutId);
        return ResponseEntity.noContent().build();
    }
}
