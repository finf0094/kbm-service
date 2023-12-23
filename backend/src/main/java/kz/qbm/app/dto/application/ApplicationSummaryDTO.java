package kz.qbm.app.dto.application;

import kz.qbm.app.dto.user.UserSummaryDTO;
import kz.qbm.app.entity.application.ApplicationStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApplicationSummaryDTO {
    private String id;
    private UserSummaryDTO user;
    private ApplicationStatus status;
}
