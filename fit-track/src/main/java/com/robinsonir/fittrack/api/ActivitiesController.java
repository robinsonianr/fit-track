package com.robinsonir.fittrack.api;

import com.robinsonir.fittrack.data.repository.activities.ActivitySummaryDTO;
import com.robinsonir.fittrack.data.service.activities.ActivitiesService;
import io.swagger.v3.oas.annotations.Parameter;
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

    @GetMapping("/member/{memberId}")
    public List<ActivitySummaryDTO> getMemberActivitiesByActivityType(
            @Parameter(description = "memberId", required = true) @PathVariable final Long memberId,
            @RequestParam(required = false) final String activityType) {
        return activitiesService.getMemberActivitiesByActivityType(memberId, activityType);
    }
}