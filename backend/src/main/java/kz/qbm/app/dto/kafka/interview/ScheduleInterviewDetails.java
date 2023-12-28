package kz.qbm.app.dto.kafka.interview;

import lombok.Getter;

import java.time.Duration;

@Getter
public class ScheduleInterviewDetails {
    private Duration time;
    private String format;
    private String venue;
    private String position;
}