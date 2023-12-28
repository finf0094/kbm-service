package kz.qbm.app.entity.application;

import jakarta.persistence.*;
import lombok.Getter;

import java.util.Date;


@Getter
@Entity
@Table(name = "schedule_interview_details")
public class ScheduleInterviewDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @Temporal(TemporalType.TIMESTAMP)
    private Date time;
    private String format;
    private String venue;
    private String position;
}