package com.robinsonir.fittrack.mappers;

import com.robinsonir.fittrack.data.Fitness;
import com.robinsonir.fittrack.data.Gender;
import com.robinsonir.fittrack.data.entity.member.MemberEntity;
import com.robinsonir.fittrack.data.repository.member.MemberDTO;
import com.robinsonir.fittrack.data.service.member.MemberRegistrationRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class MemberMapperTest {

    private MemberMapper mapper;

    @BeforeEach
    void setUp() {
        mapper = new MemberMapperImpl();
    }

    @Test
    void memberEntityToMemberDTOMapsAllFields() {
        OffsetDateTime memberSince = OffsetDateTime.parse("2025-01-15T10:00:00Z");
        OffsetDateTime lastModified = OffsetDateTime.parse("2026-04-01T12:30:00Z");
        LocalDate dateOfBirth = LocalDate.of(1995, 6, 20);

        MemberEntity entity = new MemberEntity();
        entity.setId(42L);
        entity.setName("Jane Doe");
        entity.setEmail("jane@example.com");
        entity.setPassword("hashed");
        entity.setGender(Gender.FEMALE);
        entity.setDateOfBirth(dateOfBirth);
        entity.setWeight(65);
        entity.setHeight(170);
        entity.setWeightGoal(60);
        entity.setFitness(Fitness.INTERMEDIATE);
        entity.setBodyFat(22);
        entity.setMemberSince(memberSince);
        entity.setProfileImageId("profile-uuid");
        entity.setLastModifiedDate(lastModified);

        MemberDTO dto = mapper.memberEntityToMemberDTO(entity);

        assertThat(dto.id()).isEqualTo(42L);
        assertThat(dto.name()).isEqualTo("Jane Doe");
        assertThat(dto.email()).isEqualTo("jane@example.com");
        assertThat(dto.gender()).isEqualTo(Gender.FEMALE);
        assertThat(dto.dateOfBirth()).isEqualTo(dateOfBirth);
        assertThat(dto.weight()).isEqualTo(65);
        assertThat(dto.height()).isEqualTo(170);
        assertThat(dto.weightGoal()).isEqualTo(60);
        assertThat(dto.fitness()).isEqualTo(Fitness.INTERMEDIATE);
        assertThat(dto.bodyFat()).isEqualTo(22);
        assertThat(dto.memberSince()).isEqualTo(memberSince);
        assertThat(dto.profileImageId()).isEqualTo("profile-uuid");
        assertThat(dto.lastModifiedDate()).isEqualTo(lastModified);
    }

    @Test
    void memberEntityToMemberDTODerivesUsernameFromEmail() {
        MemberEntity entity = new MemberEntity();
        entity.setEmail("user@example.com");

        MemberDTO dto = mapper.memberEntityToMemberDTO(entity);

        assertThat(dto.username()).isEqualTo("user@example.com");
    }

    @Test
    void memberEntityToMemberDTOPopulatesRolesFromAuthorities() {
        MemberEntity entity = new MemberEntity();
        entity.setEmail("user@example.com");

        MemberDTO dto = mapper.memberEntityToMemberDTO(entity);

        assertThat(dto.roles()).containsExactly("ROLE_USER");
    }

    @Test
    void memberEntityToMemberDTOLeavesOptionalFieldsNullWhenUnset() {
        MemberEntity entity = new MemberEntity();
        entity.setId(1L);
        entity.setEmail("user@example.com");

        MemberDTO dto = mapper.memberEntityToMemberDTO(entity);

        assertThat(dto.weight()).isNull();
        assertThat(dto.height()).isNull();
        assertThat(dto.weightGoal()).isNull();
        assertThat(dto.fitness()).isNull();
        assertThat(dto.bodyFat()).isNull();
        assertThat(dto.profileImageId()).isNull();
        assertThat(dto.memberSince()).isNull();
        assertThat(dto.lastModifiedDate()).isNull();
    }

    @Test
    void memberEntityToMemberDTOReturnsNullForNullInput() {
        assertThat(mapper.memberEntityToMemberDTO(null)).isNull();
    }

    @Test
    void memberEntityListToMemberDTOListMapsEachElementInOrder() {
        MemberEntity first = new MemberEntity();
        first.setId(1L);
        first.setName("Alice");
        first.setEmail("alice@example.com");

        MemberEntity second = new MemberEntity();
        second.setId(2L);
        second.setName("Bob");
        second.setEmail("bob@example.com");

        List<MemberDTO> result = mapper.memberEntityListToMemberDTOList(List.of(first, second));

        assertThat(result).hasSize(2);
        assertThat(result.get(0).id()).isEqualTo(1L);
        assertThat(result.get(0).name()).isEqualTo("Alice");
        assertThat(result.get(1).id()).isEqualTo(2L);
        assertThat(result.get(1).name()).isEqualTo("Bob");
    }

    @Test
    void memberEntityListToMemberDTOListReturnsEmptyListForEmptyInput() {
        assertThat(mapper.memberEntityListToMemberDTOList(List.of())).isEmpty();
    }

    @Test
    void memberEntityListToMemberDTOListReturnsNullForNullInput() {
        assertThat(mapper.memberEntityListToMemberDTOList(null)).isNull();
    }

    @Test
    void registrationRequestToEntityCopiesRequestFields() {
        LocalDate dateOfBirth = LocalDate.of(2000, 3, 15);
        MemberRegistrationRequest request = new MemberRegistrationRequest(
                "John Doe",
                "john@example.com",
                "rawPassword",
                dateOfBirth,
                Gender.MALE
        );

        MemberEntity entity = mapper.registrationRequestToEntity(request);

        assertThat(entity.getName()).isEqualTo("John Doe");
        assertThat(entity.getEmail()).isEqualTo("john@example.com");
        assertThat(entity.getPassword()).isEqualTo("rawPassword");
        assertThat(entity.getDateOfBirth()).isEqualTo(dateOfBirth);
        assertThat(entity.getGender()).isEqualTo(Gender.MALE);
    }

    @Test
    void registrationRequestToEntityDoesNotPopulateNonRequestFields() {
        MemberRegistrationRequest request = new MemberRegistrationRequest(
                "John Doe",
                "john@example.com",
                "rawPassword",
                LocalDate.of(2000, 3, 15),
                Gender.MALE
        );

        MemberEntity entity = mapper.registrationRequestToEntity(request);

        // Per @BeanMapping(ignoreByDefault = true) — only declared @Mapping fields are copied.
        assertThat(entity.getId()).isNull();
        assertThat(entity.getMemberSince()).isNull();
        assertThat(entity.getWeight()).isNull();
        assertThat(entity.getHeight()).isNull();
        assertThat(entity.getWeightGoal()).isNull();
        assertThat(entity.getFitness()).isNull();
        assertThat(entity.getBodyFat()).isNull();
        assertThat(entity.getProfileImageId()).isNull();
    }

    @Test
    void registrationRequestToEntityReturnsNullForNullInput() {
        assertThat(mapper.registrationRequestToEntity(null)).isNull();
    }

    @Test
    void mapAuthoritiesReturnsEmptyListForNullInput() {
        assertThat(mapper.mapAuthorities(null)).isEmpty();
    }

    @Test
    void mapAuthoritiesReturnsEmptyListForEmptyCollection() {
        assertThat(mapper.mapAuthorities(List.<GrantedAuthority>of())).isEmpty();
    }

    @Test
    void mapAuthoritiesExtractsAuthorityStrings() {
        List<GrantedAuthority> authorities = List.of(
                new SimpleGrantedAuthority("ROLE_USER"),
                new SimpleGrantedAuthority("ROLE_ADMIN")
        );

        assertThat(mapper.mapAuthorities(authorities))
                .containsExactly("ROLE_USER", "ROLE_ADMIN");
    }
}
