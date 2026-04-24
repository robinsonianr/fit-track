package com.robinsonir.fittrack.data.service.member;

import com.robinsonir.fittrack.data.Gender;
import com.robinsonir.fittrack.data.entity.member.MemberEntity;
import com.robinsonir.fittrack.data.repository.member.MemberDTO;
import com.robinsonir.fittrack.data.repository.member.MemberRepository;
import com.robinsonir.fittrack.exception.DuplicateResourceException;
import com.robinsonir.fittrack.exception.ResourceNotFoundException;
import com.robinsonir.fittrack.mappers.MemberMapper;
import com.robinsonir.fittrack.mappers.MemberMapperImpl;
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

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class MemberServiceTest {

    private MemberMapper memberMapper = new MemberMapperImpl();

    @Mock
    private MemberRepository memberRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private S3Service s3Service;

    private MemberService memberTest;

    @BeforeEach
    void setUp() {
        memberTest = new MemberService(memberMapper, passwordEncoder, s3Service, memberRepository);
        memberTest.setS3Bucket("fitness-tracker-customers");
    }

    @Test
    void getAllMembers() {
        // When
        memberTest.getAllMembers();

        // Then
        verify(memberRepository).findAll();
    }

    @Test
    void testGetMember() {
        // Arrange
        Long memberId = 1L;
        MemberEntity memberEntity = new MemberEntity();
        memberEntity.setId(memberId);
        memberEntity.setName("John Doe");
        memberEntity.setEmail("john.doe@example.com");
        memberEntity.setPassword("password123");
        memberEntity.setAge(30);
        memberEntity.setGender(Gender.MALE);

        when(memberRepository.findById(memberId)).thenReturn(Optional.of(memberEntity));

        // Act
        MemberDTO member = memberTest.getMember(memberId);

        // Assert
        assertEquals(memberId, member.id());
        assertEquals("John Doe", member.name());
        assertEquals("john.doe@example.com", member.email());
        assertEquals(30, member.age());
        assertEquals(Gender.MALE, member.gender());
    }

    @Test
    void testGetMemberNotFound() {
        // Arrange
        Long memberId = 99L;
        when(memberRepository.findById(memberId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThatThrownBy(() -> memberTest.getMember(memberId))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("member with id [99] not found");
    }

    @Test
    void addMember() {
        // Arrange
        MemberRegistrationRequest registrationRequest = new MemberRegistrationRequest(
                "John Doe",
                "johndoe@example.com",
                "password123",
                30,
                Gender.MALE
        );

        when(memberRepository.existsByEmail(registrationRequest.email())).thenReturn(false);
        when(passwordEncoder.encode(registrationRequest.password())).thenReturn("hashedPassword");

        // Act
        MemberDTO result = memberTest.addMember(registrationRequest);

        // Assert — repository was called with the mapped entity
        verify(memberRepository).save(
                argThat(member ->
                        member.getName().equals(registrationRequest.name()) &&
                                member.getEmail().equals(registrationRequest.email()) &&
                                member.getPassword().equals("hashedPassword") &&
                                member.getAge().equals(registrationRequest.age()) &&
                                member.getGender().equals(registrationRequest.gender())
                )
        );

        // Assert — returned DTO reflects the registered member
        assertThat(result.name()).isEqualTo("John Doe");
        assertThat(result.email()).isEqualTo("johndoe@example.com");
        assertThat(result.age()).isEqualTo(30);
        assertThat(result.gender()).isEqualTo(Gender.MALE);
    }

    @Test
    void addMemberThrowsWhenEmailExists() {
        // Arrange
        MemberRegistrationRequest registrationRequest = new MemberRegistrationRequest(
                "John Doe",
                "johndoe@example.com",
                "password123",
                30,
                Gender.MALE
        );
        when(memberRepository.existsByEmail(registrationRequest.email())).thenReturn(true);

        // Act & Assert
        assertThatThrownBy(() -> memberTest.addMember(registrationRequest))
                .isInstanceOf(DuplicateResourceException.class)
                .hasMessage("email already taken");

        verify(memberRepository, never()).save(any());
    }

    @Test
    void testUpdateMemberWithChanges() {
        // Arrange
        Long memberId = 1L;
        MemberEntity existingMember = new MemberEntity();
        existingMember.setId(memberId);
        existingMember.setName("John Doe");
        existingMember.setEmail("john.doe@example.com");
        existingMember.setPassword("hashedPassword");
        existingMember.setAge(30);
        existingMember.setGender(Gender.MALE);

        MemberUpdateRequest updateRequest = new MemberUpdateRequest(
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

        when(memberRepository.findById(memberId)).thenReturn(Optional.of(existingMember));
        when(memberRepository.existsByEmail(updateRequest.email())).thenReturn(false);

        // Act
        MemberDTO result = memberTest.updateMember(memberId, updateRequest);

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
        assertThat(existingMember.getName()).isEqualTo("Jane Doe");
        assertThat(existingMember.getEmail()).isEqualTo("jane@example.com");
    }

    @Test
    void testUpdateMemberPartialOnlyUpdatesNonNullFields() {
        // Arrange
        Long memberId = 1L;
        MemberEntity existingMember = new MemberEntity();
        existingMember.setId(memberId);
        existingMember.setName("John Doe");
        existingMember.setEmail("john.doe@example.com");
        existingMember.setAge(30);
        existingMember.setGender(Gender.MALE);
        existingMember.setWeight(80);
        existingMember.setActivity("Running");

        MemberUpdateRequest partialRequest = new MemberUpdateRequest(
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

        when(memberRepository.findById(memberId)).thenReturn(Optional.of(existingMember));

        // Act
        MemberDTO result = memberTest.updateMember(memberId, partialRequest);

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
    void testUpdateMemberNotFound() {
        // Arrange
        Long memberId = 99L;
        MemberUpdateRequest updateRequest = new MemberUpdateRequest(
                "Jane Doe", null, null, null, null, null, null, null, null
        );
        when(memberRepository.findById(memberId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThatThrownBy(() -> memberTest.updateMember(memberId, updateRequest))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("member with id [99] not found");
    }

    @Test
    void testUpdateMemberThrowsWhenEmailAlreadyUsed() {
        // Arrange
        Long memberId = 1L;
        MemberEntity existingMember = new MemberEntity();
        existingMember.setId(memberId);
        existingMember.setEmail("john.doe@example.com");

        MemberUpdateRequest updateRequest = new MemberUpdateRequest(
                null, "taken@example.com", null, null, null, null, null, null, null
        );

        when(memberRepository.findById(memberId)).thenReturn(Optional.of(existingMember));
        when(memberRepository.existsByEmail("taken@example.com")).thenReturn(true);

        // Act & Assert
        assertThatThrownBy(() -> memberTest.updateMember(memberId, updateRequest))
                .isInstanceOf(DuplicateResourceException.class)
                .hasMessage("email already used.");

        // Email on entity was not changed
        assertThat(existingMember.getEmail()).isEqualTo("john.doe@example.com");
    }

    @Test
    void testUpdateMemberSameEmailDoesNotCheckUniqueness() {
        // Arrange — request email matches current email
        Long memberId = 1L;
        MemberEntity existingMember = new MemberEntity();
        existingMember.setId(memberId);
        existingMember.setEmail("john.doe@example.com");
        existingMember.setName("John Doe");

        MemberUpdateRequest updateRequest = new MemberUpdateRequest(
                "John Updated", "john.doe@example.com", null, null, null, null, null, null, null
        );

        when(memberRepository.findById(memberId)).thenReturn(Optional.of(existingMember));

        // Act
        memberTest.updateMember(memberId, updateRequest);

        // Assert — existsByEmail not called because email didn't change
        verify(memberRepository, never()).existsByEmail(any());
    }

    @Test
    void uploadMemberProfilePicture() {
        // Arrange
        Long memberId = 1L;
        byte[] bytes = "Hello World".getBytes();
        MultipartFile testFile = new MockMultipartFile("file", bytes);
        String bucket = "fitness-tracker-customers";

        // Act
        memberTest.uploadMemberProfilePicture(memberId, testFile);

        // Then
        ArgumentCaptor<String> profileImageIdArgumentCaptor = ArgumentCaptor.forClass(String.class);

        verify(memberRepository).updateProfileImageId(profileImageIdArgumentCaptor.capture(), eq(memberId));

        verify(s3Service).putObject(
                bucket,
                "profile-images/%s/%s".formatted(memberId, profileImageIdArgumentCaptor.getValue()),
                bytes
        );
    }


    @Test
    void getProfilePictureMemberExists() {
        // Arrange
        Long memberId = 1L;
        String profileImageId = "ca4cd8f6-3487-4e79-ba0f-56e8047d5a62";
        byte[] expectedImageData = "Hello World".getBytes();

        MemberEntity testMemberEntity = new MemberEntity();
        testMemberEntity.setId(memberId);
        testMemberEntity.setName("John Doe");
        testMemberEntity.setEmail("john.doe@example.com");
        testMemberEntity.setPassword("hashedPassword");
        testMemberEntity.setAge(30);
        testMemberEntity.setGender(Gender.MALE);
        testMemberEntity.setProfileImageId(profileImageId);

        when(memberRepository.findById(memberId)).thenReturn(Optional.of(testMemberEntity));
        when(s3Service.getObject("fitness-tracker-customers", "profile-images/1/ca4cd8f6-3487-4e79-ba0f-56e8047d5a62"))
                .thenReturn(expectedImageData);

        // Act
        byte[] actualImageData = memberTest.getProfilePicture(memberId);

        // Then
        assertThat(actualImageData).isEqualTo(expectedImageData);
    }

    @Test
    void getProfilePictureMemberDoesNotExist() {
        // Arrange
        Long memberId = 1L;
        when(memberRepository.findById(memberId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThatThrownBy(() -> memberTest.getProfilePicture(memberId))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("member with id [1] not found");
    }

    @Test
    void getProfilePictureMemberHasNoProfileImage() {
        // Arrange
        Long memberId = 1L;
        MemberEntity testMemberEntity = new MemberEntity();
        testMemberEntity.setId(memberId);
        testMemberEntity.setName("John Doe");
        testMemberEntity.setEmail("john.doe@example.com");
        testMemberEntity.setPassword("hashedPassword");
        testMemberEntity.setAge(30);
        testMemberEntity.setGender(Gender.MALE);

        when(memberRepository.findById(memberId)).thenReturn(Optional.of(testMemberEntity));

        // Act & Assert
        assertThatThrownBy(() -> memberTest.getProfilePicture(memberId))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("member with id [1] profile image not found");
    }
}
