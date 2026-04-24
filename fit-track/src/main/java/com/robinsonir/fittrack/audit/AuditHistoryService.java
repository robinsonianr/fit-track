package com.robinsonir.fittrack.audit;

import com.robinsonir.fittrack.data.entity.member.MemberEntity;
import org.hibernate.envers.AuditReader;
import org.hibernate.envers.query.AuditEntity;
import org.hibernate.envers.query.AuditQuery;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AuditHistoryService {

    private final AuditReader auditReader;

    public AuditHistoryService(AuditReader auditReader) {
        this.auditReader = auditReader;
    }

    public List<WeightTrendDTO> getMemberWeightTrend(Long memberId) {
        List<WeightTrendDTO> weightAudit = new ArrayList<>();
        AuditQuery auditQuery = auditReader.createQuery()
                .forRevisionsOfEntity(MemberEntity.class, true, true)
                .add(AuditEntity.id().eq(memberId))
                .add(AuditEntity.property("weight").hasChanged());

        List items = auditQuery.getResultList();
        for (Object item : items) {
            MemberEntity member = (MemberEntity) item;
            weightAudit.add(new WeightTrendDTO(member.getWeight(), member.getLastModifiedDate()));
        }

        return weightAudit;
    }

}
