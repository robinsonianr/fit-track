package com.robinsonir.fittrack.data.repository.member;

import com.robinsonir.fittrack.data.Gender;
import com.robinsonir.fittrack.data.entity.member.MemberEntity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
public class MemberRepositoryTest {

    @Autowired
    private MemberRepository memberRepository;


    @Test
    void testAddMember() {
        MemberEntity member = new MemberEntity();
        member.setName("John Doe");
        member.setEmail("john.doe@example.com");
        member.setPassword("password123");
        member.setDateOfBirth(LocalDate.of(1995, 1, 1));
        member.setGender(Gender.MALE);

        MemberEntity savedMember = memberRepository.save(member);

        assertNotNull(savedMember.getId());
        assertEquals("John Doe", savedMember.getName());
        assertEquals("john.doe@example.com", savedMember.getEmail());
        assertEquals(Gender.MALE, savedMember.getGender());
    }

    @Test
    void testFindMemberById() {
        MemberEntity member = new MemberEntity();
        member.setName("Jane Doe");
        member.setEmail("jane.doe@example.com");
        member.setPassword("securePass");
        member.setDateOfBirth(LocalDate.of(1997, 6, 15));
        member.setGender(Gender.FEMALE);

        memberRepository.save(member);

        Optional<MemberEntity> foundMember = memberRepository.findById(member.getId());

        assertTrue(foundMember.isPresent());
        assertEquals("Jane Doe", foundMember.get().getName());
    }

    @Test
    void testFindByEmail() {
        MemberEntity member = new MemberEntity();
        member.setName("Jane Doe");
        member.setEmail("jane.doe@example.com");
        member.setPassword("securePass");
        member.setDateOfBirth(LocalDate.of(1997, 6, 15));
        member.setGender(Gender.FEMALE);

        memberRepository.save(member);

        Optional<MemberEntity> foundMember = memberRepository.findByEmail(member.getEmail());

        assertTrue(foundMember.isPresent());
        assertEquals("jane.doe@example.com", foundMember.get().getEmail());
    }

    @Test
    void testExistsByEmail() {
        MemberEntity member = new MemberEntity();
        member.setName("Alice Johnson");
        member.setEmail("alice.johnson@example.com");
        member.setPassword("alicePass");
        member.setDateOfBirth(LocalDate.of(1996, 3, 10));
        member.setGender(Gender.FEMALE);

        memberRepository.save(member);

        boolean exists = memberRepository.existsByEmail("alice.johnson@example.com");
        assertTrue(exists);

        boolean notExists = memberRepository.existsByEmail("nonexistent@example.com");
        assertFalse(notExists);
    }

    @Test
    void testUpdateProfileImageId() {
        MemberEntity member = new MemberEntity();
        member.setName("Daniel Craig");
        member.setEmail("daniel.craig@example.com");
        member.setPassword("bond007");
        member.setDateOfBirth(LocalDate.of(1975, 4, 12));
        member.setGender(Gender.MALE);

        memberRepository.save(member);

        String newProfileImageId = "img12345";
        memberRepository.updateProfileImageId(newProfileImageId, member.getId());

        Optional<MemberEntity> updatedMember = memberRepository.findById(member.getId());

        assertTrue(updatedMember.isPresent());
        assertEquals(newProfileImageId, updatedMember.get().getProfileImageId());
    }
}
