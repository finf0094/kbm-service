package kz.qbm.app.dto.auth;

import lombok.Data;

@Data
public class CreateUserRequest {
    private String itin;
    private String password;
    private String email;
}
