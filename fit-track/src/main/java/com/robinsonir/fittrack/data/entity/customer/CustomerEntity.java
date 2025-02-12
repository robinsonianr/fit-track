package com.robinsonir.fittrack.data.entity.customer;

import com.robinsonir.fittrack.data.Gender;
import com.robinsonir.fittrack.data.entity.AbstractEntity;
import com.robinsonir.fittrack.data.entity.workout.WorkoutEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.OffsetDateTime;
import java.util.Collection;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(schema = "fit_tracker", name = "customer")
@AllArgsConstructor
@NoArgsConstructor
public class CustomerEntity extends AbstractEntity implements UserDetails {

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "age", nullable = false)
    private Integer age;

    @Column(name = "gender", nullable = false)
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "profile_image_id", unique = true)
    private String profileImageId;

    @Column(name = "weight")
    private Integer weight;

    @Column(name = "height")
    private Integer height;

    @Column(name = "weight_goal")
    private Integer weightGoal;

    @Column(name = "activity")
    private String activity;

    @Column(name = "body_fat")
    private Integer bodyFat;

    @Column(name = "member_since")
    private OffsetDateTime memberSince;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<WorkoutEntity> customerWorkouts;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
