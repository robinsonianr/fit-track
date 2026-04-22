package com.robinsonir.fittrack.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class JwtTokenUtil {

    @Value( "${jwt.secret-key}")
    private String secretKey;

    public String generateToken(String subject, String... roles) {
        return generateToken(subject, Map.of("scopes", roles));
    }

    public String generateToken(String subject, List<String> roles) {
        return generateToken(subject, Map.of("scopes", roles));
    }

    public String getSubject(String token) {
        return getClaims(token).getSubject();
    }

    public String generateToken(String subject, Map<String, Object> claims) {
        return Jwts
                .builder()
                .claims(claims)
                .subject(subject)
                .issuer("fittrack")
                .issuedAt(Date.from(Instant.now()))
                .expiration(Date.from(Instant.now().plus(1, ChronoUnit.DAYS)))
                .signWith(getSigningKey())
                .compact();
    }

    public boolean isTokenValid(String token, String username) {
        final String subject = getSubject(token);
        return subject.equals(username) && !isTokenExpired(token);
    }

    private Claims getClaims(String token) {
        return Jwts
                .parser()
                .requireIssuer("fittrack")
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }


    public boolean isTokenExpired(String token) {
        Date today = Date.from(Instant.now());
        return getClaims(token).getExpiration().before(today);
    }


    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }

}
