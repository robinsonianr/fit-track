package com.robinsonir.fittrack.config;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.hibernate.envers.AuditReader;
import org.hibernate.envers.AuditReaderFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.annotation.RequestScope;

@Configuration
public class AuditHistoryConfig {

    @PersistenceContext
    private EntityManager entityManager;

    @Bean
    @RequestScope
    AuditReader auditReader() {
        return AuditReaderFactory.get(entityManager);
    }
}
