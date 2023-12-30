package kz.qbm.app.service.report;


import kz.qbm.app.dto.application.ApplicationSummaryDTO;
import kz.qbm.app.dto.report.PositionCandidatesDTO;
import kz.qbm.app.dto.report.PositionReportDTO;
import kz.qbm.app.entity.position.Position;
import kz.qbm.app.repository.position.PositionRepository;
import kz.qbm.app.service.application.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ApplicationReportService {

    @Autowired
    private PositionRepository positionRepository;

    @Autowired
    private ApplicationService applicationService; // предполагается, что ваш метод getAllApplicationWithPagination находится здесь

    public List<PositionReportDTO> generatePositionReport() {
        List<Position> positions = positionRepository.findAll();
        List<PositionReportDTO> report = new ArrayList<>();

        for (Position position : positions) {
            Page<ApplicationSummaryDTO> totalApplications = applicationService.getAllApplicationWithPagination(null, position.getName(), null, 0, 1);
            Page<ApplicationSummaryDTO> passedApplications = applicationService.getAllApplicationWithPagination("APPROVED", position.getName(), null, 0, 1);
            Page<ApplicationSummaryDTO> failedApplications = applicationService.getAllApplicationWithPagination("REJECTED", position.getName(), null, 0, 1);
            Page<ApplicationSummaryDTO> inInterviewApplications = applicationService.getAllApplicationWithPagination("INTERVIEW_SCHEDULED", position.getName(), null, 0, 1);
            Page<ApplicationSummaryDTO> inTestingApplications = applicationService.getAllApplicationWithPagination("TESTING", position.getName(), null, 0, 1);
            Page<ApplicationSummaryDTO> inProcessApplications = applicationService.getAllApplicationWithPagination("IN_PROCESS", position.getName(), null, 0, 1);

            PositionReportDTO positionReport = new PositionReportDTO();
            positionReport.setPositionName(position.getName());
            positionReport.setTotalApplications(totalApplications.getTotalElements());
            positionReport.setPassedApplications(passedApplications.getTotalElements());
            positionReport.setFailedApplications(failedApplications.getTotalElements());
            positionReport.setInInterview(inInterviewApplications.getTotalElements());
            positionReport.setInTesting(inTestingApplications.getTotalElements());
            positionReport.setInProcess(inProcessApplications.getTotalElements());

            report.add(positionReport);
        }

        return report;
    }

    public List<PositionCandidatesDTO> getCandidatesByPosition(String status, String search, int offset, int pageSize) {
        List<Position> positions = positionRepository.findAll();
        List<PositionCandidatesDTO> candidatesByPosition = new ArrayList<>();

        for (Position position : positions) {
            Page<ApplicationSummaryDTO> applications = applicationService.getAllApplicationWithPagination(status, position.getName(), search, offset, pageSize);
            PositionCandidatesDTO positionCandidates = new PositionCandidatesDTO();
            positionCandidates.setPositionName(position.getName());
            positionCandidates.setCandidates(applications.getContent());
            candidatesByPosition.add(positionCandidates);
        }

        return candidatesByPosition;
    }

}
