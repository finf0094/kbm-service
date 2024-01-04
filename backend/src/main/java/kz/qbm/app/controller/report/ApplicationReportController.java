package kz.qbm.app.controller.report;

import kz.qbm.app.dto.report.PositionReportDTO;
import kz.qbm.app.service.report.ApplicationReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/position-report")
@RequiredArgsConstructor
public class ApplicationReportController {

    private final ApplicationReportService applicationReportService;

    @GetMapping("/{positionId}")
    public PositionReportDTO getPositionReport(@PathVariable Long positionId,
                                               @RequestParam(required = false) String status,
                                               @RequestParam(required = false) String search,
                                               @RequestParam(defaultValue = "0") int offset,
                                               @RequestParam(defaultValue = "10") int pageSize) {
        return applicationReportService.getPositionReport(positionId, status, search, offset, pageSize);
    }
}