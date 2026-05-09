package com.robinsonir.fittrack.data.repository.member;

import com.robinsonir.fittrack.data.entity.member.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<MemberEntity, Long>, MemberUpdateRepository {

    Optional<MemberEntity> findByEmail(String email);

    boolean existsByEmail(String email);

}
