package com.robinsonir.fittrack.data.repository.member;

import com.robinsonir.fittrack.data.entity.member.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<MemberEntity, Long>, MemberUpdateRepository {

    @Query("select m from MemberEntity m where m.email = ?1")
    Optional<MemberEntity> findMemberByEmail(String email);

    @Query("select m from MemberEntity m where m.email = ?1")
    Optional<MemberEntity> findMemberByUsername(String username);

    boolean existsByEmail(String email);
}
