package com.robinsonir.fittrack.data.service.customer;

import com.robinsonir.fittrack.data.entity.customer.CustomerEntity;
import com.robinsonir.fittrack.data.repository.customer.CustomerDTO;
import com.robinsonir.fittrack.data.repository.customer.CustomerRepository;
import com.robinsonir.fittrack.exception.DuplicateResourceException;
import com.robinsonir.fittrack.exception.FileUploadException;
import com.robinsonir.fittrack.exception.ResourceNotFoundException;
import com.robinsonir.fittrack.mappers.CustomerMapper;
import com.robinsonir.fittrack.s3.S3Service;
import jakarta.transaction.Transactional;
import lombok.Setter;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
public class CustomerService {

    private final CustomerMapper customerMapper;
    private final PasswordEncoder passwordEncoder;

    private final S3Service s3Service;
    private final CustomerRepository customerRepository;

    @Setter
    @Value("${s3.bucket.name}")
    private String s3Bucket;

    public CustomerService(CustomerMapper customerMapper,
                           PasswordEncoder passwordEncoder,
                           S3Service s3Service,
                           CustomerRepository customerRepository) {
        this.customerMapper = customerMapper;
        this.passwordEncoder = passwordEncoder;
        this.s3Service = s3Service;
        this.customerRepository = customerRepository;
    }

    public List<CustomerDTO> getAllCustomers() {
        return customerMapper.customerEntityListToCustomerList(customerRepository.findAllCustomers());
    }


    public CustomerDTO getCustomer(Long id) {
        CustomerEntity customerEntity = customerRepository.findCustomerById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "customer with id [%s] not found".formatted(id)
                ));
        return customerMapper.customerEntityToCustomer(customerEntity);
    }

    @Transactional
    public void addCustomer(CustomerRegistrationRequest customerRegistrationRequest) {
        String email = customerRegistrationRequest.email();
        if (customerRepository.existsByEmail(email)) {
            throw new DuplicateResourceException(
                    "email already taken"
            );
        }


        CustomerEntity customerEntity = customerMapper.registrationRequestToEntity(customerRegistrationRequest);
        customerEntity.setPassword(passwordEncoder.encode(customerRegistrationRequest.password()));

        // Allows revinfo to obtain username after customer is persisted
        Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, Collections.emptyList());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        try {
            customerRepository.save(customerEntity);
        } finally {
            SecurityContextHolder.clearContext();
        }
    }

    @Transactional
    public void uploadCustomerProfilePicture(Long customerId, MultipartFile file) {
        String profileImageId = UUID.randomUUID().toString();

        customerRepository.updateProfileImageId(profileImageId, customerId);
        try {
            s3Service.putObject(
                    s3Bucket,
                    profileImageKey(customerId, profileImageId),
                    file.getBytes());

        } catch (IOException e) {
            throw new FileUploadException("failed to upload profile image", e);
        }
    }


    public byte[] getProfilePicture(Long customerId) {
        CustomerEntity customerEntity = customerRepository.findCustomerById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "customer with id [%s] not found".formatted(customerId)
                ));


        if (StringUtils.isBlank(customerEntity.getProfileImageId())) {
            throw new ResourceNotFoundException(
                    "customer with id [%s] profile image not found".formatted(customerId));
        }

        return s3Service.getObject(
                s3Bucket,
                profileImageKey(customerId, customerEntity.getProfileImageId())
        );
    }

    @Transactional
    public void updateCustomer(Long id, CustomerUpdateRequest updateRequest) {
        CustomerEntity customerEntity = customerRepository.findCustomerById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "customer with id [%s] not found".formatted(id)
                ));

        if (updateRequest.email() != null &&
                !updateRequest.email().equals(customerEntity.getEmail())) {
            if (customerRepository.existsByEmail(updateRequest.email())) {
                throw new DuplicateResourceException(
                        "email already used."
                );
            }
            customerEntity.setEmail(updateRequest.email());
        }

        customerRepository.updateCustomer(id,
                updateRequest.name(),
                updateRequest.email(),
                updateRequest.age(),
                updateRequest.gender(),
                updateRequest.weight(),
                updateRequest.height(),
                updateRequest.weightGoal(),
                updateRequest.activity(),
                updateRequest.bodyFat()
        );
    }


    private String profileImageKey(Long customerId, String profileImageId) {
        return "profile-images/%s/%s".formatted(customerId, profileImageId);
    }

}
