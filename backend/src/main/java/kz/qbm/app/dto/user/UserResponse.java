package kz.qbm.app.dto.user;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class UserResponse {
    private Long id;
    private String itin;
    private String firstname;
    private String lastname;
    private String password;
    private String email;
    private List<String> roles;
}
