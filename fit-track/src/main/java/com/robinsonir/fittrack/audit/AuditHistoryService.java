package com.robinsonir.fittrack.audit;

import com.robinsonir.fittrack.data.entity.member.MemberEntity;
import org.hibernate.envers.AuditReader;
import org.hibernate.envers.query.AuditEntity;
import org.hibernate.envers.query.AuditQuery;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AuditHistoryService {

    private final AuditReader auditReader;

    public AuditHistoryService(AuditReader auditReader) {
        this.auditReader = auditReader;
    }

    public List<WeightAuditHistoryDTO> getCustomerWeightHistory(Long entityId) {
        List<WeightAuditHistoryDTO> weightAudit = new ArrayList<>();
        AuditQuery auditQuery = auditReader.createQuery()
                .forRevisionsOfEntity(MemberEntity.class, true,true)
                .add(AuditEntity.id().eq(entityId))
                .add(AuditEntity.property("weight").hasChanged());

        List items = auditQuery.getResultList();
        for (Object item : items) {
            MemberEntity member = (MemberEntity) item;
            weightAudit.add(new WeightAuditHistoryDTO(member.getWeight(), member.getLastModifiedDate()));
        }

        return weightAudit;
    }

}
