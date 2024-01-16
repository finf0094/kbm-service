package kz.qbm.app.dto.application;

import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

import java.util.Date;

@Data
public class ScheduleInterviewDetailsDTO {
    private Long id;
    @Temporal(TemporalType.TIMESTAMP)
    private Date time;
    private String format;
    private String venue;
    private String position;
    private Long curatorId; // заменяем объект Curator на его ID
}