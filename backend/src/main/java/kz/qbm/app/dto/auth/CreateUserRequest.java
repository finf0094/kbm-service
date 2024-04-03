package kz.qbm.app.dto.auth;

import lombok.Data;

@Data
public class CreateUserRequest {
    private String itin;
    private String firstname;
    private String lastname;
    private String password;
    private String email;
}
