package com.robinsonir.fittrack.api;

import com.robinsonir.fittrack.data.repository.customer.CustomerDTO;
import com.robinsonir.fittrack.data.service.customer.CustomerRegistrationRequest;
import com.robinsonir.fittrack.data.service.customer.CustomerService;
import com.robinsonir.fittrack.data.service.customer.CustomerUpdateRequest;
import com.robinsonir.fittrack.messages.ApiMessage;
import com.robinsonir.fittrack.messages.FitTrackMessageKeys;
import com.robinsonir.fittrack.security.jwt.JwtTokenUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.util.List;

@RestController
@Tag(name = "Customer API", description = "API for managing customers")
@RequestMapping(path = "api/v1/customers")
public class CustomerController {
    private final CustomerService customerService;

    private final JwtTokenUtil jwtUtil;

    public CustomerController(CustomerService customerService,
                              JwtTokenUtil jwtUtil) {
        this.customerService = customerService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping
    public List<CustomerDTO> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    @ApiResponse(responseCode = "401", description = "Unauthorized")
    @ApiResponse(responseCode = "404", description = "Customer not found")
    @Operation(security = {}, summary = "Get customer by ID")
    @GetMapping("{customerId}")
    public CustomerDTO getCustomer(
            @Parameter(description = "customerId", required = true) @PathVariable final Long customerId) {
        return customerService.getCustomer(customerId);
    }

    @ApiResponse(responseCode = "409", description = "Customer already exists")
    @Operation(security = {}, summary = "Register a new customer")
    @PostMapping
    public ResponseEntity<CustomerDTO> registerCustomer(
            @Parameter(description = "request") @RequestBody CustomerRegistrationRequest request) {
        CustomerDTO created = customerService.addCustomer(request);
        URI location = URI.create("/api/v1/customers/" + created.id());
        String jwtToken = jwtUtil.generateToken(request.email(), created.roles());
        return ResponseEntity.created(location)
                .header(HttpHeaders.AUTHORIZATION, jwtToken)
                .body(created);
    }


    @ApiResponse(responseCode = "404", description = "Customer not found")
    @Operation(summary = "Update customer details")
    @PatchMapping("{customerId}")
    public CustomerDTO updateCustomer(
            @Parameter(description = "customerId") @PathVariable final Long customerId,
            @Parameter(description = "updateRequest") @RequestBody CustomerUpdateRequest updateRequest) {
        return customerService.updateCustomer(customerId, updateRequest);
    }

    @Operation(summary = "Upload profile image for customer")
    @PutMapping(
            value = "{customerId}/profile-image",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ApiMessage uploadCustomerProfileImage(
            @Parameter(description = "customerId") @PathVariable final Long customerId,
            @Parameter(description = "file") @RequestParam("file") MultipartFile file) {
        customerService.uploadCustomerProfilePicture(customerId, file);
        return FitTrackMessageKeys.CUSTOMER_IMAGE_UPLOAD_SUCCESS.toApiMessage();
    }

    @ApiResponse(responseCode = "404", description = "Customer not found")
    @Operation(summary = "Get profile image for customer")
    @GetMapping(
            value = "{customerId}/profile-image",
            produces = MediaType.IMAGE_JPEG_VALUE
    )
    public byte[] getCustomerProfileImage(
            @Parameter(description = "customerId") @PathVariable Long customerId) {
        return customerService.getProfilePicture(customerId);
    }
}
