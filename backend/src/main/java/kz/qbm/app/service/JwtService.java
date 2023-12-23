package kz.qbm.app.service;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import kz.qbm.app.config.CustomUserDetails;
import kz.qbm.app.exception.AuthenticationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@Slf4j
public class JwtService {
    public static final String ACCESS_TOKEN_SECRET_KEY = "AP/mTtG2INNS9nS/dz4kT+Lxo+Au4PhjfXE09zLKaZs=";
    public static final String REFRESH_TOKEN_SECRET_KEY = "y2Xb7OBNEH/OkNuy4ve5PfvJblsZGLGr1P+rnyGjcIW3nEq71QhiV1n2e05PZVkp1nK1XvcagFkR0v73k/+igw==";
    private static final Duration REFRESH_TOKEN_EXPIRATION_TIME = Duration.ofDays(3);
    private static final Duration jwtLifetime = Duration.ofMinutes(15);;

    public String generateAccessToken(CustomUserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        List<String> roleList = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).toList();

        claims.put("roles", roleList);
        claims.put("email", userDetails.getEmail());
        claims.put("itin", userDetails.getItin());

        Date issuedDate = new Date();
        Date expiredDate = new Date(issuedDate.getTime() + jwtLifetime.toMillis());

        return Jwts.builder()
                .setClaims(claims)
                .setSubject("access_token")
                .setIssuedAt(issuedDate)
                .setExpiration(expiredDate)
                .signWith(SignatureAlgorithm.HS256, ACCESS_TOKEN_SECRET_KEY)
                .compact();
    }

    public List<String> getRoles(String token) {
        return getAccessTokenClaims(token).get("roles", List.class);
    }

    public String getUsername(String token) {
        return getAccessTokenClaims(token).get("itin", String.class);
    }

    public Claims getAccessTokenClaims(String token) throws ExpiredJwtException {
        try {
            return Jwts.parser()
                    .setSigningKey(ACCESS_TOKEN_SECRET_KEY)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (UnsupportedJwtException | MalformedJwtException e) {
            log.error("Unsupported or malformed token: " + e.getMessage(), e);
            throw new AuthenticationException("Unsupported or malformed token", HttpStatus.UNAUTHORIZED);
        } catch (SignatureException e) {
            log.error("Invalid signature in token: " + e.getMessage(), e);
            throw new AuthenticationException("Invalid signature in token", HttpStatus.UNAUTHORIZED);
        }  catch (IllegalArgumentException e) {
            log.error("Token claims are invalid: " + e.getMessage(), e);
            throw new AuthenticationException("Token claims are invalid", HttpStatus.UNAUTHORIZED);
        }
    }

    public String generateRefreshToken(CustomUserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", userDetails.getEmail());
        claims.put("itin", userDetails.getItin());
        return Jwts.builder()
                .setSubject("refresh_token")
                .setClaims(claims)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRATION_TIME.toMillis()))
                .signWith(SignatureAlgorithm.HS512, REFRESH_TOKEN_SECRET_KEY)
                .compact();
    }

    public boolean isRefreshTokenValid(String refreshToken) {
        try {
            Jwts.parser()
                    .setSigningKey(REFRESH_TOKEN_SECRET_KEY)
                    .parseClaimsJws(refreshToken)
                    .getBody();
            return true;
        }  catch (UnsupportedJwtException | MalformedJwtException e) {
            log.error("Unsupported or malformed token: " + e.getMessage(), e);
            throw new AuthenticationException("Unsupported or malformed token", HttpStatus.UNAUTHORIZED);
        } catch (IllegalArgumentException e) {
            log.error("Token claims are invalid: " + e.getMessage(), e);
            throw new AuthenticationException("Token claims are invalid", HttpStatus.UNAUTHORIZED);
        } catch (SignatureException e) {
            log.error("Invalid signature in token: " + e.getMessage(), e);
            throw new AuthenticationException("Invalid signature in token", HttpStatus.UNAUTHORIZED);
        }
    }

    public Claims getRefreshTokenClaims(String refreshToken) {
        try {
            return Jwts.parser()
                    .setSigningKey(REFRESH_TOKEN_SECRET_KEY)
                    .parseClaimsJws(refreshToken)
                    .getBody();
        } catch (UnsupportedJwtException | MalformedJwtException e) {
            log.error("Unsupported or malformed token: " + e.getMessage(), e);
            throw new AuthenticationException("Unsupported or malformed token", HttpStatus.UNAUTHORIZED);
        } catch (SignatureException e) {
            log.error("Invalid signature in token: " + e.getMessage(), e);
            throw new AuthenticationException("Invalid signature in token", HttpStatus.UNAUTHORIZED);
        }  catch (IllegalArgumentException e) {
            log.error("Token claims are invalid: " + e.getMessage(), e);
            throw new AuthenticationException("Token claims are invalid", HttpStatus.UNAUTHORIZED);
        }
    }

    public String getRefreshTokenItin(String refreshToken) {
        return getRefreshTokenClaims(refreshToken).get("itin", String.class);
    }
}