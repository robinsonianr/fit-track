package com.robinsonir.fittrack.data.service.customer;

import com.robinsonir.fittrack.data.Gender;
import com.robinsonir.fittrack.data.entity.customer.CustomerEntity;
import com.robinsonir.fittrack.data.repository.customer.CustomerDTO;
import com.robinsonir.fittrack.data.repository.customer.CustomerRepository;
import com.robinsonir.fittrack.exception.DuplicateResourceException;
import com.robinsonir.fittrack.exception.ResourceNotFoundException;
import com.robinsonir.fittrack.mappers.CustomerMapper;
import com.robinsonir.fittrack.mappers.CustomerMapperImpl;
import com.robinsonir.fittrack.s3.S3Service;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

import java.time.ZoneOffset;
import java.util.Date;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CustomerServiceTest {

    private CustomerMapper customerMapper = new CustomerMapperImpl();

    @Mock
    private CustomerRepository customerRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private S3Service s3Service;

    private CustomerService customerTest;

    @BeforeEach
    void setUp() {
        customerTest = new CustomerService(customerMapper, passwordEncoder, s3Service, customerRepository);
        customerTest.setS3Bucket("fitness-tracker-customers");
    }

    @Test
    void getAllCustomers() {
        // When
        customerTest.getAllCustomers();

        // Then
        verify(customerRepository).findAllCustomers();
    }

    @Test
    void testGetCustomer() {
        // Arrange
        Long customerId = 1L;
        CustomerEntity customerEntity = new CustomerEntity();
        customerEntity.setId(customerId);
        customerEntity.setName("John Doe");
        customerEntity.setEmail("john.doe@example.com");
        customerEntity.setPassword("password123");
        customerEntity.setAge(30);
        customerEntity.setGender(Gender.MALE);

        when(customerRepository.findCustomerById(customerId)).thenReturn(Optional.of(customerEntity));

        // Act
        CustomerDTO customer = customerTest.getCustomer(customerId);

        // Assert
        assertEquals(customerId, customer.id());
        assertEquals("John Doe", customer.name());
        assertEquals("john.doe@example.com", customer.email());
        assertEquals(30, customer.age());
        assertEquals(Gender.MALE, customer.gender());
    }

    @Test
    void testGetCustomerNotFound() {
        // Arrange
        Long customerId = 99L;
        when(customerRepository.findCustomerById(customerId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThatThrownBy(() -> customerTest.getCustomer(customerId))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("customer with id [99] not found");
    }

    @Test
    void addCustomer() {
        // Arrange
        CustomerRegistrationRequest registrationRequest = new CustomerRegistrationRequest(
                "John Doe",
                "johndoe@example.com",
                "password123",
                30,
                Gender.MALE,
                new Date().toInstant().atOffset(ZoneOffset.UTC)
        );

        when(customerRepository.existsByEmail(registrationRequest.email())).thenReturn(false);
        when(passwordEncoder.encode(registrationRequest.password())).thenReturn("hashedPassword");

        // Act
        CustomerDTO result = customerTest.addCustomer(registrationRequest);

        // Assert — repository was called with the mapped entity
        verify(customerRepository).save(
                argThat(customer ->
                        customer.getName().equals(registrationRequest.name()) &&
                                customer.getEmail().equals(registrationRequest.email()) &&
                                customer.getPassword().equals("hashedPassword") &&
                                customer.getAge().equals(registrationRequest.age()) &&
                                customer.getGender().equals(registrationRequest.gender()) &&
                                customer.getMemberSince().equals(registrationRequest.memberSince())
                )
        );

        // Assert — returned DTO reflects the registered customer
        assertThat(result.name()).isEqualTo("John Doe");
        assertThat(result.email()).isEqualTo("johndoe@example.com");
        assertThat(result.age()).isEqualTo(30);
        assertThat(result.gender()).isEqualTo(Gender.MALE);
    }

    @Test
    void addCustomerThrowsWhenEmailExists() {
        // Arrange
        CustomerRegistrationRequest registrationRequest = new CustomerRegistrationRequest(
                "John Doe",
                "johndoe@example.com",
                "password123",
                30,
                Gender.MALE,
                new Date().toInstant().atOffset(ZoneOffset.UTC)
        );
        when(customerRepository.existsByEmail(registrationRequest.email())).thenReturn(true);

        // Act & Assert
        assertThatThrownBy(() -> customerTest.addCustomer(registrationRequest))
                .isInstanceOf(DuplicateResourceException.class)
                .hasMessage("email already taken");

        verify(customerRepository, never()).save(any());
    }

    @Test
    void testUpdateCustomerWithChanges() {
        // Arrange
        Long customerId = 1L;
        CustomerEntity existingCustomer = new CustomerEntity();
        existingCustomer.setId(customerId);
        existingCustomer.setName("John Doe");
        existingCustomer.setEmail("john.doe@example.com");
        existingCustomer.setPassword("hashedPassword");
        existingCustomer.setAge(30);
        existingCustomer.setGender(Gender.MALE);

        CustomerUpdateRequest updateRequest = new CustomerUpdateRequest(
                "Jane Doe",
                "jane@example.com",
                28,
                Gender.FEMALE,
                65,
                170,
                60,
                "Cycling",
                18
        );

        when(customerRepository.findCustomerById(customerId)).thenReturn(Optional.of(existingCustomer));
        when(customerRepository.existsByEmail(updateRequest.email())).thenReturn(false);

        // Act
        CustomerDTO result = customerTest.updateCustomer(customerId, updateRequest);

        // Assert — returned DTO reflects the updates
        assertThat(result.name()).isEqualTo("Jane Doe");
        assertThat(result.email()).isEqualTo("jane@example.com");
        assertThat(result.age()).isEqualTo(28);
        assertThat(result.gender()).isEqualTo(Gender.FEMALE);
        assertThat(result.weight()).isEqualTo(65);
        assertThat(result.height()).isEqualTo(170);
        assertThat(result.weightGoal()).isEqualTo(60);
        assertThat(result.activity()).isEqualTo("Cycling");
        assertThat(result.bodyFat()).isEqualTo(18);

        // Assert — dirty tracking applied to managed entity; no explicit save call
        assertThat(existingCustomer.getName()).isEqualTo("Jane Doe");
        assertThat(existingCustomer.getEmail()).isEqualTo("jane@example.com");
    }

    @Test
    void testUpdateCustomerPartialOnlyUpdatesNonNullFields() {
        // Arrange
        Long customerId = 1L;
        CustomerEntity existingCustomer = new CustomerEntity();
        existingCustomer.setId(customerId);
        existingCustomer.setName("John Doe");
        existingCustomer.setEmail("john.doe@example.com");
        existingCustomer.setAge(30);
        existingCustomer.setGender(Gender.MALE);
        existingCustomer.setWeight(80);
        existingCustomer.setActivity("Running");

        CustomerUpdateRequest partialRequest = new CustomerUpdateRequest(
                null,      // name — unchanged
                null,      // email — unchanged
                null,      // age — unchanged
                null,      // gender — unchanged
                75,        // weight — updated
                null,      // height — unchanged
                70,        // weightGoal — updated
                null,      // activity — unchanged
                null       // bodyFat — unchanged
        );

        when(customerRepository.findCustomerById(customerId)).thenReturn(Optional.of(existingCustomer));

        // Act
        CustomerDTO result = customerTest.updateCustomer(customerId, partialRequest);

        // Assert — only weight and weightGoal changed; rest preserved
        assertThat(result.name()).isEqualTo("John Doe");
        assertThat(result.email()).isEqualTo("john.doe@example.com");
        assertThat(result.age()).isEqualTo(30);
        assertThat(result.gender()).isEqualTo(Gender.MALE);
        assertThat(result.weight()).isEqualTo(75);
        assertThat(result.weightGoal()).isEqualTo(70);
        assertThat(result.activity()).isEqualTo("Running");
    }

    @Test
    void testUpdateCustomerNotFound() {
        // Arrange
        Long customerId = 99L;
        CustomerUpdateRequest updateRequest = new CustomerUpdateRequest(
                "Jane Doe", null, null, null, null, null, null, null, null
        );
        when(customerRepository.findCustomerById(customerId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThatThrownBy(() -> customerTest.updateCustomer(customerId, updateRequest))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("customer with id [99] not found");
    }

    @Test
    void testUpdateCustomerThrowsWhenEmailAlreadyUsed() {
        // Arrange
        Long customerId = 1L;
        CustomerEntity existingCustomer = new CustomerEntity();
        existingCustomer.setId(customerId);
        existingCustomer.setEmail("john.doe@example.com");

        CustomerUpdateRequest updateRequest = new CustomerUpdateRequest(
                null, "taken@example.com", null, null, null, null, null, null, null
        );

        when(customerRepository.findCustomerById(customerId)).thenReturn(Optional.of(existingCustomer));
        when(customerRepository.existsByEmail("taken@example.com")).thenReturn(true);

        // Act & Assert
        assertThatThrownBy(() -> customerTest.updateCustomer(customerId, updateRequest))
                .isInstanceOf(DuplicateResourceException.class)
                .hasMessage("email already used.");

        // Email on entity was not changed
        assertThat(existingCustomer.getEmail()).isEqualTo("john.doe@example.com");
    }

    @Test
    void testUpdateCustomerSameEmailDoesNotCheckUniqueness() {
        // Arrange — request email matches current email
        Long customerId = 1L;
        CustomerEntity existingCustomer = new CustomerEntity();
        existingCustomer.setId(customerId);
        existingCustomer.setEmail("john.doe@example.com");
        existingCustomer.setName("John Doe");

        CustomerUpdateRequest updateRequest = new CustomerUpdateRequest(
                "John Updated", "john.doe@example.com", null, null, null, null, null, null, null
        );

        when(customerRepository.findCustomerById(customerId)).thenReturn(Optional.of(existingCustomer));

        // Act
        customerTest.updateCustomer(customerId, updateRequest);

        // Assert — existsByEmail not called because email didn't change
        verify(customerRepository, never()).existsByEmail(any());
    }

    @Test
    void uploadCustomerProfilePicture() {
        // Arrange
        Long customerId = 1L;
        byte[] bytes = "Hello World".getBytes();
        MultipartFile testFile = new MockMultipartFile("file", bytes);
        String bucket = "fitness-tracker-customers";

        // Act
        customerTest.uploadCustomerProfilePicture(customerId, testFile);

        // Then
        ArgumentCaptor<String> profileImageIdArgumentCaptor = ArgumentCaptor.forClass(String.class);

        verify(customerRepository).updateProfileImageId(profileImageIdArgumentCaptor.capture(), eq(customerId));

        verify(s3Service).putObject(
                bucket,
                "profile-images/%s/%s".formatted(customerId, profileImageIdArgumentCaptor.getValue()),
                bytes
        );
    }


    @Test
    void getProfilePictureCustomerExists() {
        // Arrange
        Long customerId = 1L;
        String profileImageId = "ca4cd8f6-3487-4e79-ba0f-56e8047d5a62";
        byte[] expectedImageData = "Hello World".getBytes();

        CustomerEntity testCustomerEntity = new CustomerEntity();
        testCustomerEntity.setId(customerId);
        testCustomerEntity.setName("John Doe");
        testCustomerEntity.setEmail("john.doe@example.com");
        testCustomerEntity.setPassword("hashedPassword");
        testCustomerEntity.setAge(30);
        testCustomerEntity.setGender(Gender.MALE);
        testCustomerEntity.setProfileImageId(profileImageId);

        when(customerRepository.findCustomerById(customerId)).thenReturn(Optional.of(testCustomerEntity));
        when(s3Service.getObject("fitness-tracker-customers", "profile-images/1/ca4cd8f6-3487-4e79-ba0f-56e8047d5a62"))
                .thenReturn(expectedImageData);

        // Act
        byte[] actualImageData = customerTest.getProfilePicture(customerId);

        // Then
        assertThat(actualImageData).isEqualTo(expectedImageData);
    }

    @Test
    void getProfilePictureCustomerDoesNotExist() {
        // Arrange
        Long customerId = 1L;
        when(customerRepository.findCustomerById(customerId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThatThrownBy(() -> customerTest.getProfilePicture(customerId))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("customer with id [1] not found");
    }

    @Test
    void getProfilePictureCustomerHasNoProfileImage() {
        // Arrange
        Long customerId = 1L;
        CustomerEntity testCustomerEntity = new CustomerEntity();
        testCustomerEntity.setId(customerId);
        testCustomerEntity.setName("John Doe");
        testCustomerEntity.setEmail("john.doe@example.com");
        testCustomerEntity.setPassword("hashedPassword");
        testCustomerEntity.setAge(30);
        testCustomerEntity.setGender(Gender.MALE);

        when(customerRepository.findCustomerById(customerId)).thenReturn(Optional.of(testCustomerEntity));

        // Act & Assert
        assertThatThrownBy(() -> customerTest.getProfilePicture(customerId))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("customer with id [1] profile image not found");
    }
}
