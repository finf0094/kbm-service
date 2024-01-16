package kz.qbm.app.entity.application;

import jakarta.persistence.*;
import kz.qbm.app.entity.Curator;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;


@Setter
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

    @ManyToOne
    @JoinColumn(name = "curator_id")
    private Curator curator;
}