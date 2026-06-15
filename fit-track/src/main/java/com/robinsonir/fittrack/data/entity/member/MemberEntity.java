package com.robinsonir.fittrack.data.entity.member;

import com.robinsonir.fittrack.data.Fitness;
import com.robinsonir.fittrack.data.Gender;
import com.robinsonir.fittrack.data.entity.AbstractModifiedDateEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.hibernate.envers.AuditTable;
import org.hibernate.envers.Audited;
import org.hibernate.envers.NotAudited;
import org.jspecify.annotations.NonNull;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.Collection;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Audited(withModifiedFlag = true)
@AuditTable(value = "member_aud", schema = "fit_tracker")
@Table(schema = "fit_tracker", name = "member")
public class MemberEntity extends AbstractModifiedDateEntity implements UserDetails {

    @NotAudited
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dateOfBirth;

    @Column(name = "gender", nullable = false)
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @ToString.Exclude
    @Column(name = "password", nullable = false)
    @NotAudited
    private String password;

    @Column(name = "profile_image_id", unique = true)
    private String profileImageId;

    @Column(name = "weight")
    private Double weight;

    @Column(name = "height")
    private Integer height;

    @Column(name = "weight_goal")
    private Double weightGoal;

    @Column(name = "fitness")
    @Enumerated(EnumType.STRING)
    private Fitness fitness;

    @Column(name = "body_fat")
    private Double bodyFat;

    @NotAudited
    @Column(name = "member_since")
    private OffsetDateTime memberSince;

    @Override
    public @NonNull Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public @NonNull String getUsername() {
        return email;
    }
}
