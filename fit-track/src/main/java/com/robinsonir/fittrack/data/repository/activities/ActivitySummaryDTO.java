package com.robinsonir.fittrack.data.repository.activities;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.OffsetDateTime;

@Schema(name = "ActivitySummaryDTO")
public record ActivitySummaryDTO(
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        Long id,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        Long memberId,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        Long sourceId,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        String activityType,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        String routineContext,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        Integer durationMinutes,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        String highlight,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        Boolean highlightIsPR,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        OffsetDateTime activityTimestamp
) {
}
