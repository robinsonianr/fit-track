package com.robinsonir.fittrack.audit;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.OffsetDateTime;
import java.util.Map;

@Schema(name = "WeightAuditHistoryDTO")
public record WeightAuditHistoryDTO(
        Map<Integer, OffsetDateTime> weightByDate
) {
}
