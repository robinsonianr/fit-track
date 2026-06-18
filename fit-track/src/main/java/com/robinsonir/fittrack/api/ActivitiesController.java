package com.robinsonir.fittrack.api;

import com.robinsonir.fittrack.data.repository.activities.ActivityDetailDTO;
import com.robinsonir.fittrack.data.repository.activities.ActivitySummaryDTO;
import com.robinsonir.fittrack.data.service.activities.ActivitiesService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Tag(name = "Activities API", description = "API for managing activities")
@RequestMapping(path = "api/v1/activities")
public class ActivitiesController {
    private final ActivitiesService activitiesService;

    public ActivitiesController(final ActivitiesService activitiesService) {
        this.activitiesService = activitiesService;
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
}