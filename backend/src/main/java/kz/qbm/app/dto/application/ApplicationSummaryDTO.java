package kz.qbm.app.dto.application;

import kz.qbm.app.dto.kafka.interview.InterviewEmployeeEmail;
import kz.qbm.app.dto.user.UserSummaryDTO;
import kz.qbm.app.entity.application.ApplicationStatus;
import kz.qbm.app.entity.application.ScheduleInterviewDetails;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApplicationSummaryDTO {
    private String id;
    private UserSummaryDTO user;
    private ApplicationStatus status;
    private ScheduleInterviewDetails interviewDetails;
}
