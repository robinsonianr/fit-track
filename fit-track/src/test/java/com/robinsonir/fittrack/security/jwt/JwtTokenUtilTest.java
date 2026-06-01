package com.robinsonir.fittrack.security.jwt;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.springframework.test.util.ReflectionTestUtils;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class JwtTokenUtilTest {

    private JwtTokenUtil jwtTokenUtil;

    private static final String SECRET_KEY = "this-is-a-test-secret-key-that-is-long-enough-for-hmac-sha256";

    @BeforeEach
    void setUp() {
        jwtTokenUtil = new JwtTokenUtil();
        ReflectionTestUtils.setField(jwtTokenUtil, "secretKey", SECRET_KEY);
    }

    @Test
    void generateTokenReturnsNonNullToken() {
        String token = jwtTokenUtil.generateToken("user@example.com", List.of("ROLE_USER"));

        assertThat(token).isNotNull().isNotBlank();
    }

    @Test
    void getSubjectReturnsCorrectSubject() {
        String email = "user@example.com";
        String token = jwtTokenUtil.generateToken(email, List.of("ROLE_USER"));

        String subject = jwtTokenUtil.getSubject(token);

        assertThat(subject).isEqualTo(email);
    }

    @Test
    void generateTokenIncludesScopesInClaims() {
        String token = jwtTokenUtil.generateToken("user@example.com", List.of("ROLE_USER", "ROLE_ADMIN"));

        SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
        var claims = Jwts.parser()
                .requireIssuer("fittrack")
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();

        assertThat(claims.get("scopes")).isEqualTo(List.of("ROLE_USER", "ROLE_ADMIN"));
        assertThat(claims.getIssuer()).isEqualTo("fittrack");
    }

    @Test
    void generateTokenExpiresInFifteenMinutes() {
        Instant before = Instant.now().plus(14, ChronoUnit.MINUTES);
        String token = jwtTokenUtil.generateToken("user@example.com", List.of("ROLE_USER"));
        Instant after = Instant.now().plus(16, ChronoUnit.MINUTES);

        SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
        Date expiration = Jwts.parser()
                .requireIssuer("fittrack")
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getExpiration();

        assertThat(expiration.toInstant()).isAfter(before);
        assertThat(expiration.toInstant()).isBefore(after);
    }

    @Test
    void generateRefreshTokenReturnsNonNullToken() {
        String token = jwtTokenUtil.generateRefreshToken("user@example.com");

        assertThat(token).isNotNull().isNotBlank();
    }

    @Test
    void generateRefreshTokenHasCorrectSubject() {
        String email = "user@example.com";
        String token = jwtTokenUtil.generateRefreshToken(email);

        String subject = jwtTokenUtil.getSubject(token);

        assertThat(subject).isEqualTo(email);
    }

    @Test
    void generateRefreshTokenExpiresInThirtyDays() {
        Instant before = Instant.now().plus(29, ChronoUnit.DAYS);
        String token = jwtTokenUtil.generateRefreshToken("user@example.com");
        Instant after = Instant.now().plus(31, ChronoUnit.DAYS);

        SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
        Date expiration = Jwts.parser()
                .requireIssuer("fittrack")
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getExpiration();

        assertThat(expiration.toInstant()).isAfter(before);
        assertThat(expiration.toInstant()).isBefore(after);
    }

    @Test
    void isTokenValidReturnsTrueForValidToken() {
        String email = "user@example.com";
        String token = jwtTokenUtil.generateToken(email, List.of("ROLE_USER"));

        assertThat(jwtTokenUtil.isTokenValid(token, email)).isTrue();
    }

    @Test
    void isTokenValidReturnsFalseForWrongUsername() {
        String token = jwtTokenUtil.generateToken("user@example.com", List.of("ROLE_USER"));

        assertThat(jwtTokenUtil.isTokenValid(token, "other@example.com")).isFalse();
    }

    @Test
    void isTokenExpiredReturnsFalseForFreshToken() {
        String token = jwtTokenUtil.generateToken("user@example.com", List.of("ROLE_USER"));

        assertThat(jwtTokenUtil.isTokenExpired(token)).isFalse();
    }

    @Test
    void isTokenExpiredThrowsForExpiredToken() {
        SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
        String expiredToken = Jwts.builder()
                .subject("user@example.com")
                .issuer("fittrack")
                .issuedAt(Date.from(Instant.now().minus(2, ChronoUnit.HOURS)))
                .expiration(Date.from(Instant.now().minus(1, ChronoUnit.HOURS)))
                .signWith(key)
                .compact();

        assertThatThrownBy(() -> jwtTokenUtil.isTokenExpired(expiredToken))
                .isInstanceOf(ExpiredJwtException.class);
    }

    @Test
    void isTokenValidThrowsForExpiredToken() {
        SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
        String expiredToken = Jwts.builder()
                .subject("user@example.com")
                .issuer("fittrack")
                .issuedAt(Date.from(Instant.now().minus(2, ChronoUnit.HOURS)))
                .expiration(Date.from(Instant.now().minus(1, ChronoUnit.HOURS)))
                .signWith(key)
                .compact();

        assertThatThrownBy(() -> jwtTokenUtil.isTokenValid(expiredToken, "user@example.com"))
                .isInstanceOf(ExpiredJwtException.class);
    }
}
