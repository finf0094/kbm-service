package kz.qbm.app.dto.auth;

import kz.qbm.app.dto.user.UserResponse;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthResponse {
    private String access_token;
    private String refresh_token;
    private UserResponse user;
}
