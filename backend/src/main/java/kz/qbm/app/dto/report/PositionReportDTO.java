package kz.qbm.app.dto.report;


import lombok.Data;

@Data
public class PositionReportDTO {
    private String positionName;
    private long totalApplications;
    private long passedApplications;
    private long failedApplications;
    private long inInterview;
    private long inTesting;
    private long inProcess;
}