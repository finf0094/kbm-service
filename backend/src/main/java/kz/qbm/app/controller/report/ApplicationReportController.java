package kz.qbm.app.controller.report;

import kz.qbm.app.dto.report.PositionCandidatesDTO;
import kz.qbm.app.dto.report.PositionReportDTO;
import kz.qbm.app.service.report.ApplicationReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ApplicationReportController {

    @Autowired
    private ApplicationReportService applicationReportService;

    @GetMapping("/report/position")
    public List<PositionReportDTO> getPositionReport() {
        return applicationReportService.generatePositionReport();
    }

    @GetMapping("/report/candidates")
    public List<PositionCandidatesDTO> getCandidatesByPosition(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int offset,
            @RequestParam(defaultValue = "10") int pageSize) {
        return applicationReportService.getCandidatesByPosition(status, search, offset, pageSize);
    }
}