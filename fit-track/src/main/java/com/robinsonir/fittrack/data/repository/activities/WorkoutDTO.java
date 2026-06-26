package com.robinsonir.fittrack.data.repository.activities;

import com.robinsonir.fittrack.data.repository.exercise.ExerciseDTO;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.OffsetDateTime;
import java.util.Set;

@Schema(name = "WorkoutDTO")
public record WorkoutDTO(
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        Long workoutId,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        Long activityId,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        Long memberId,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        String title,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        String workoutType,
        Set<ExerciseDTO> exercises,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        Integer volume,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        Integer calories,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        Integer durationMinutes,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        OffsetDateTime workoutDate
) implements ActivityDetailDTO {
    @Override
    public String activityType() {
        return "Workout";
    }

    @Override
    public OffsetDateTime activityTimestamp() {
        return workoutDate;
    }

    @Override
    public String routineContext() {
        return title;
    }

    public WorkoutDTO withActivityId(Long activityId) {
        return new WorkoutDTO(workoutId, activityId, memberId,
                title, workoutType, exercises, volume, calories,
                durationMinutes, workoutDate);
    }

}
