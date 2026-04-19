package com.robinsonir.fittrack.api;

import com.robinsonir.fittrack.audit.AuditHistoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.OffsetDateTime;
import java.util.Map;

@RestController
@Tag(name = "Audit History", description = "Audit History API")
@RequestMapping("api/v1/audit")
public class AuditHistoryController {

    private final AuditHistoryService auditHistoryService;

    public AuditHistoryController(AuditHistoryService auditHistoryService) {
        this.auditHistoryService = auditHistoryService;
    }


    @Operation(summary = "Get customer weight audit history")
    @ApiResponse(responseCode = "404", description = "Customer not found")
    @GetMapping("{entityId}")
    public ResponseEntity<Map<Integer, OffsetDateTime>> getCustomerWeightAuditHistory(@PathVariable("entityId") final Long entityId) {
        return ResponseEntity.ok(auditHistoryService.getCustomerWeightHistory(entityId));
    }
}
