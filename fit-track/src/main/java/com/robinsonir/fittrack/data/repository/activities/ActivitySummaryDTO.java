package com.robinsonir.fittrack.data.repository.activities;

import java.time.OffsetDateTime;

public record ActivitySummaryDTO(
        Long id,
        Long memberId,
        Long sourceId,
        String activityType,
        String routineContext,
        Integer durationMinutes,
        String highlight,
        Boolean highlightIsPR,
        OffsetDateTime activityTimestamp
) {
}
