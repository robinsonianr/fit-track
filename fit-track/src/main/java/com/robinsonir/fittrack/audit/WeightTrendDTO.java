package com.robinsonir.fittrack.audit;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.OffsetDateTime;

@Schema(name = "WeightTrendDTO")
public record WeightTrendDTO(
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        Integer weight,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        OffsetDateTime date
) {
}
