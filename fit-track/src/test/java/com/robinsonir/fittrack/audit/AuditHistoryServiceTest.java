package com.robinsonir.fittrack.audit;

import com.robinsonir.fittrack.data.entity.member.MemberEntity;
import org.hibernate.envers.AuditReader;
import org.hibernate.envers.query.AuditQuery;
import org.hibernate.envers.query.AuditQueryCreator;
import org.hibernate.envers.query.criteria.AuditCriterion;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.OffsetDateTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuditHistoryServiceTest {

    @Mock
    private AuditReader auditReader;

    @InjectMocks
    private AuditHistoryService auditHistoryService;

    @BeforeEach
    void setUp() {
        auditHistoryService = new AuditHistoryService(auditReader);
    }

    @Test
    void testGetCustomerWeightAuditHistory() {
        Long entityId = 1L;
        MemberEntity customer1 = new MemberEntity();
        customer1.setWeight(70);
        customer1.setLastModifiedDate(OffsetDateTime.parse("2024-01-01T10:00:00Z"));

        MemberEntity customer2 = new MemberEntity();
        customer2.setWeight(75);
        customer2.setLastModifiedDate(OffsetDateTime.parse("2024-02-01T10:00:00Z"));

        List<MemberEntity> mockResults = Arrays.asList(customer1, customer2);
        AuditQueryCreator auditQueryCreator = Mockito.mock(AuditQueryCreator.class);
        AuditQuery auditQuery = Mockito.mock(AuditQuery.class);

        when(auditReader.createQuery()).thenReturn(auditQueryCreator);
        when(auditQueryCreator.forRevisionsOfEntity(MemberEntity.class, true, true))
                .thenReturn(auditQuery);
        when(auditQuery.add(any(AuditCriterion.class))).thenReturn(auditQuery);
        when(auditQuery.getResultList()).thenReturn(mockResults);

        List<WeightAuditHistoryDTO> result = auditHistoryService.getCustomerWeightHistory(entityId);

        List<WeightAuditHistoryDTO> expected = new ArrayList<>();
        Map<Integer, OffsetDateTime> weightAuditMap1 = new HashMap<>();
        Map<Integer, OffsetDateTime> weightAuditMap2 = new HashMap<>();
        weightAuditMap1.put(70, OffsetDateTime.parse("2024-01-01T10:00:00Z"));
        weightAuditMap2.put(75, OffsetDateTime.parse("2024-02-01T10:00:00Z"));
        expected.add(new WeightAuditHistoryDTO(weightAuditMap1));
        expected.add(new WeightAuditHistoryDTO(weightAuditMap2));

        assertEquals(expected, result);
    }
}
