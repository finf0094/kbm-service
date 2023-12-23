package kz.qbm.app.dto.user;

import kz.qbm.app.entity.Role;
import lombok.Builder;
import lombok.Data;

import java.util.List;


@Data
@Builder
public class UserUpdateDTO {
    private String itin;
    private String firstname;
    private String lastname;
    private String phoneNumber;
    private String position;
    private String aboutMe;
    private List<Role> roles;
    private String email;
}
