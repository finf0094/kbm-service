package kz.qbm.app.dto.report;



import kz.qbm.app.dto.application.ApplicationSummaryDTO;
import lombok.Data;

import java.util.List;

@Data
public class PositionReportDTO {
    private String positionName;
    private long totalApplications;
    private long passedApplications;
    private long failedApplications;
    private long inPending;
    private long inInterview;
    private long inTesting;
    private long inProcess;
    private List<ApplicationSummaryDTO> candidates;
}