package kz.qbm.app.dto.user;

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
    private String email;
    private String position;
    private String phoneNumber;
    private List<String> roles;
}
