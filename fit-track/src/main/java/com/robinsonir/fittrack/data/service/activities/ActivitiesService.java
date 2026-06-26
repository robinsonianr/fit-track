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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivitiesService {
    private static final Logger LOGGER = LoggerFactory.getLogger(ActivitiesService.class);
    private final WorkoutService workoutService;
    private final ActivityRepository activityRepository;
    private final ActivityMapper activityMapper;

    public ActivitiesService(final WorkoutService workoutService,
                             final ActivityMapper activityMapper, final ActivityRepository activityRepository) {
        this.workoutService = workoutService;
        this.activityMapper = activityMapper;
        this.activityRepository = activityRepository;
    }

    public List<ActivitySummaryDTO> getActivitySummariesByMemberId(Long memberId, String activityType) {
        LOGGER.info("Getting activities for member {} with activity type {}", memberId, activityType);
        if (activityType != null) {
            return activityMapper.activityEntityListToActivitySummaryDTOList(activityRepository.findByMemberIdAndActivityType(memberId, activityType));
        } else {
            return activityMapper.activityEntityListToActivitySummaryDTOList(activityRepository.findByMemberId(memberId));
        }
    }

    public ActivitySummaryDTO getActivitySummary(Long activityId) {
        LOGGER.info("Getting activity summary for activity {}", activityId);
        return activityMapper.activityEntityToActivitySummaryDTO(activityRepository.findById(activityId)
                .orElseThrow(() -> new ResourceNotFoundException("Activity not found")));
    }

    public ActivityDetailDTO getActivityDetail(Long activityId) {
        LOGGER.info("Getting activity detail for activity {}", activityId);
        ActivityEntity activity = activityRepository.findById(activityId)
                .orElseThrow(() -> new ResourceNotFoundException("Activity not found"));

        return switch (activity.getActivityType()) {
            case "Workout" -> workoutService.getWorkout(activity.getSourceId()).withActivityId(activity.getId());
            default -> throw new IllegalStateException("Unexpected value: " + activity.getActivityType());
        };
    }


    public ActivitySummaryDTO addActivity(WorkoutDTO workout, ActivityCreationRequest request) {
        LOGGER.info("Adding activity {}", workout);

        ActivityEntity activity = new ActivityEntity();
        activity.setActivityTimestamp(workout.workoutDate());
        activity.setActivityType("Workout");
        activity.setMemberId(request.memberId());
        activity.setRoutineContext(workout.title());
        activity.setDurationMinutes(workout.durationMinutes());
        activity.setHighlight(getHighlight(workout));
        activity.setHighlightIsPR(false);
        activity.setSourceId(workout.workoutId());
        activityRepository.save(activity);
        return activityMapper.activityEntityToActivitySummaryDTO(activity);
    }

    public void deleteActivity(Long activityId) {
        LOGGER.info("Deleting activity {}", activityId);
        activityRepository.deleteById(activityId);
    }

    public String getHighlight(WorkoutDTO workout) {
        String highlight = "";
        Integer weight = 0;
        for (ExerciseDTO exercise : workout.exercises()) {
            for (SetDTO set : exercise.sets()) {
                if (set.weight() > weight) {
                    weight = set.weight();
                    highlight = exercise.title() + " " + set.weight() + "x" + set.reps();
                }
            }
        }
        return highlight;
    }

}
