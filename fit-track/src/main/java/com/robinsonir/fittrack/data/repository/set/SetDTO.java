package com.robinsonir.fittrack.data.repository.set;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "SetDTO")
public record SetDTO(
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        Long id,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        Integer setNumber,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        Integer reps,
        @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
        Integer weight
) {
}
