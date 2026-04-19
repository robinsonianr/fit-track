package com.robinsonir.fittrack.api;

import com.robinsonir.fittrack.data.repository.customer.CustomerDTO;
import com.robinsonir.fittrack.data.service.customer.CustomerRegistrationRequest;
import com.robinsonir.fittrack.data.service.customer.CustomerService;
import com.robinsonir.fittrack.data.service.customer.CustomerUpdateRequest;
import com.robinsonir.fittrack.security.jwt.JwtTokenUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
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

    @ApiResponse(responseCode = "404", description = "Customer not found")
    @GetMapping("{customerId}")
    public CustomerDTO getCustomer(@PathVariable(name = "customerId") final Long customerId) {
        return customerService.getCustomer(customerId);
    }

    @ApiResponse(responseCode = "400", description = "Invalid request")
    @ApiResponse(responseCode = "409", description = "Customer already exists")
    @Operation(security = {}, summary = "Register a new customer")
    @PostMapping
    public ResponseEntity<CustomerDTO> registerCustomer(@RequestBody CustomerRegistrationRequest request) {
        CustomerDTO created = customerService.addCustomer(request);
        URI location = URI.create("/api/v1/customers/" + created.id());
        String jwtToken = jwtUtil.generateToken(request.email(), "ROLE_USER");
        return ResponseEntity.created(location)
                .header(HttpHeaders.AUTHORIZATION, jwtToken)
                .body(created);
    }


    @ApiResponse(responseCode = "404", description = "Customer not found")
    @ApiResponse(responseCode = "400", description = "Invalid request")
    @Operation(summary = "Update customer details")
    @PutMapping("update/{customerId}")
    public void updateCustomer(@PathVariable(name = "customerId") final Long customerId,
            @RequestBody CustomerUpdateRequest updateRequest) {
        customerService.updateCustomer(customerId, updateRequest);
    }

    @ApiResponse(responseCode = "500", description = "Internal server error")
    @Operation(summary = "Upload profile image for customer")
    @PutMapping(
            value = "{customerId}/profile-image",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public void uploadCustomerProfileImage(@PathVariable( name = "customerId") final Long customerId,
            @RequestParam("file") MultipartFile file) {
        customerService.uploadCustomerProfilePicture(customerId, file);
    }

    @ApiResponse(responseCode = "404", description = "Customer not found")
    @Operation(summary = "Get profile image for customer")
    @GetMapping(
            value = "{customerId}/profile-image",
            produces = MediaType.IMAGE_JPEG_VALUE
    )
    public byte[] getCustomerProfileImage(@PathVariable("customerId") Long customerId) {
        return customerService.getProfilePicture(customerId);
    }
}
