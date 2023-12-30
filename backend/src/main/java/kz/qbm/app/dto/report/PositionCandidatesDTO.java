package kz.qbm.app.dto.report;

import kz.qbm.app.dto.application.ApplicationSummaryDTO;
import lombok.Data;

import java.util.List;


@Data
public class PositionCandidatesDTO {
    private String positionName;
    private List<ApplicationSummaryDTO> candidates;

}