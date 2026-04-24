package com.robinsonir.fittrack.api;

import com.robinsonir.fittrack.audit.AuditHistoryService;
import com.robinsonir.fittrack.audit.WeightTrendDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Tag(name = "Audit History", description = "Audit History API")
@RequestMapping("api/v1/audit")
public class AuditHistoryController {

    private final AuditHistoryService auditHistoryService;

    public AuditHistoryController(AuditHistoryService auditHistoryService) {
        this.auditHistoryService = auditHistoryService;
    }


    @Operation(summary = "Get member weight trend")
    @ApiResponse(responseCode = "404", description = "Member not found")
    @GetMapping("weight/{memberId}")
    public ResponseEntity<List<WeightTrendDTO>> getMemberWeightTrend(
            @Parameter(description = "memberId") @PathVariable final Long memberId) {
        return ResponseEntity.ok(auditHistoryService.getMemberWeightTrend(memberId));
    }
}
