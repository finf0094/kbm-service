package kz.qbm.app.dto.kafka.interview;

import lombok.Getter;

import java.util.Date;

@Getter
public class ScheduleInterviewDetails {
    private Date time;
    private String format;
    private String venue;
    private String position;
}