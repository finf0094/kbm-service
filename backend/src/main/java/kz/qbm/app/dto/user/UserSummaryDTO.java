package kz.qbm.app.dto.user;

import kz.qbm.app.entity.position.Position;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class UserSummaryDTO {
    private Long id;
    private String itin;
    private String firstname;
    private String lastname;
    private String password;
    private String email;
    private Position position;
    private String phoneNumber;
    private List<String> roles;
}
