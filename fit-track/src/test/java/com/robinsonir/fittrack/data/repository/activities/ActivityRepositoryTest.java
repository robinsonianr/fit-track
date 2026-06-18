package com.robinsonir.fittrack.data.repository.activities;

import com.robinsonir.fittrack.data.Gender;
import com.robinsonir.fittrack.data.entity.activities.ActivityEntity;
import com.robinsonir.fittrack.data.entity.member.MemberEntity;
import com.robinsonir.fittrack.data.repository.member.MemberRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class ActivityRepositoryTest {

    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    private MemberRepository memberRepository;

    private MemberEntity member;

    @BeforeEach
    void setUp() {
        member = new MemberEntity();
        member.setName("John Doe");
        member.setEmail("john.doe@example.com");
        member.setPassword("password123");
        member.setDateOfBirth(LocalDate.of(1995, 1, 1));
        member.setGender(Gender.MALE);
        memberRepository.save(member);
    }

    @Test
    void testSaveActivity() {
        ActivityEntity activity = createActivity(member.getId(), "Workout", 1L);

        ActivityEntity saved = activityRepository.save(activity);

        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getActivityType()).isEqualTo("Workout");
        assertThat(saved.getMemberId()).isEqualTo(member.getId());
        assertThat(saved.getSourceId()).isEqualTo(1L);
    }

    @Test
    void testFindByMemberId() {
        activityRepository.save(createActivity(member.getId(), "Workout", 1L));
        activityRepository.save(createActivity(member.getId(), "Workout", 2L));

        List<ActivityEntity> results = activityRepository.findByMemberId(member.getId());

        assertThat(results).hasSize(2);
    }

    @Test
    void testFindByMemberIdReturnsEmptyForUnknownMember() {
        activityRepository.save(createActivity(member.getId(), "Workout", 1L));

        List<ActivityEntity> results = activityRepository.findByMemberId(999L);

        assertThat(results).isEmpty();
    }

    @Test
    void testFindByMemberIdAndActivityType() {
        activityRepository.save(createActivity(member.getId(), "Workout", 1L));
        activityRepository.save(createActivity(member.getId(), "Workout", 2L));
        activityRepository.save(createActivity(member.getId(), "Run", 3L));

        List<ActivityEntity> workouts = activityRepository.findByMemberIdAndActivityType(member.getId(), "Workout");
        List<ActivityEntity> runs = activityRepository.findByMemberIdAndActivityType(member.getId(), "Run");

        assertThat(workouts).hasSize(2);
        assertThat(runs).hasSize(1);
        assertThat(runs.get(0).getSourceId()).isEqualTo(3L);
    }

    @Test
    void testFindByMemberIdAndActivityTypeReturnsEmptyForNoMatch() {
        activityRepository.save(createActivity(member.getId(), "Workout", 1L));

        List<ActivityEntity> results = activityRepository.findByMemberIdAndActivityType(member.getId(), "Run");

        assertThat(results).isEmpty();
    }

    private ActivityEntity createActivity(Long memberId, String activityType, Long sourceId) {
        ActivityEntity entity = new ActivityEntity();
        entity.setMemberId(memberId);
        entity.setSourceId(sourceId);
        entity.setActivityType(activityType);
        entity.setRoutineContext("Push Day");
        entity.setDurationMinutes(60);
        entity.setHighlight("Bench Press 225x5");
        entity.setHighlightIsPR(false);
        entity.setActivityTimestamp(OffsetDateTime.now());
        return entity;
    }
}
