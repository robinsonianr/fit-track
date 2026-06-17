package com.robinsonir.fittrack.data.service.activities;

import com.robinsonir.fittrack.data.entity.activities.ActivityEntity;
import com.robinsonir.fittrack.data.entity.exercise.ExerciseEntity;
import com.robinsonir.fittrack.data.entity.set.SetEntity;
import com.robinsonir.fittrack.data.entity.workout.WorkoutEntity;
import com.robinsonir.fittrack.data.repository.activities.ActivityDetailDTO;
import com.robinsonir.fittrack.data.repository.activities.ActivityRepository;
import com.robinsonir.fittrack.data.repository.activities.ActivitySummaryDTO;
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

    public List<ActivitySummaryDTO> getMemberActivitiesByActivityType(Long memberId, String activityType) {
        LOGGER.info("Getting activities for member {} with activity type {}", memberId, activityType);
        if (activityType != null) {
            return activityMapper.activityEntityListToActivitySummaryDTOList(activityRepository.findByMemberIdAndActivityType(memberId, activityType));
        } else {
            return activityMapper.activityEntityListToActivitySummaryDTOList(activityRepository.findByMemberId(memberId));
        }
    }

    public ActivityDetailDTO getActivityDetail(Long activityId) {
        LOGGER.info("Getting activity detail for activity {}", activityId);
        ActivityEntity activity = activityRepository.findById(activityId)
                .orElseThrow(() -> new ResourceNotFoundException("Activity not found"));

        return switch (activity.getActivityType())
        {
            case "Workout" -> workoutService.getWorkout(activity.getSourceId());
            default -> throw new IllegalStateException("Unexpected value: " + activity.getActivityType());
        };
    }

    public void addActivity(ActivityEntity activity) {
        LOGGER.info("Adding activity {}", activity);
        activityRepository.save(activity);
    }

    public String getHighlight(WorkoutEntity workout) {
        String highlight = "";
        Integer weight = 0;
        for (ExerciseEntity exercise : workout.getExercises()) {
            for (SetEntity set : exercise.getSets()) {
                if (set.getWeight() > weight) {
                    weight = set.getWeight();
                    highlight = exercise.getTitle() + " " + set.getWeight() + "x" + set.getReps();
                }
            }
        }
        return highlight;
    }

}
