package kz.qbm.app.dto.kafka.interview;

import kz.qbm.app.dto.kafka.Email;
import lombok.Getter;

import java.sql.Timestamp;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
public class InterviewEmployeeEmail extends Email {
    private String employeeName;
    private String position;
    private String format;
    private String venue;
    private Date time;
    private String curatorName;

    public InterviewEmployeeEmail(String to, String from, String subject, String content, String employeeName, String position, String format, String venue, Date time, String curatorName) {
        super(to, from, subject, content);
        this.employeeName = employeeName;
        this.position = position;
        this.format = format;
        this.venue = venue;
        this.time = time;
        this.curatorName = curatorName;
    }
}
