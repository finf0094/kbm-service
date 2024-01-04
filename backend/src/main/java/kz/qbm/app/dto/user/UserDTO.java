package kz.qbm.app.dto.user;

import kz.qbm.app.entity.Role;
import kz.qbm.app.entity.position.Position;
import lombok.Builder;
import lombok.Data;

import java.util.List;


@Data
@Builder
public class UserDTO {
    private String itin;
    private String firstname;
    private String lastname;
    private String password;
    private String phoneNumber;
    private Position position;
    private String aboutMe;
    private List<Role> roles;
    private String email;
}
