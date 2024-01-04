package kz.qbm.app.service.report;


import kz.qbm.app.dto.application.ApplicationSummaryDTO;
import kz.qbm.app.dto.report.PositionReportDTO;
import kz.qbm.app.entity.position.Position;
import kz.qbm.app.exception.NotFoundException;
import kz.qbm.app.repository.position.PositionRepository;
import kz.qbm.app.service.application.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class ApplicationReportService {

    private final PositionRepository positionRepository;
    private final ApplicationService applicationService;

    public PositionReportDTO getPositionReport(Long positionId, String status, String search, int offset, int pageSize) {
        Position position = positionRepository.findById(positionId).orElseThrow(
                () -> new NotFoundException(String.format("Position with id %s not found", positionId))
        );

        Page<ApplicationSummaryDTO> totalApplications = applicationService.getAllApplicationWithPagination(null, position.getName(), null, 0, 1);
        Page<ApplicationSummaryDTO> passedApplications = applicationService.getAllApplicationWithPagination("APPROVED", position.getName(), null, 0, 1);
        Page<ApplicationSummaryDTO> failedApplications = applicationService.getAllApplicationWithPagination("REJECTED", position.getName(), null, 0, 1);
        Page<ApplicationSummaryDTO> inInterviewApplications = applicationService.getAllApplicationWithPagination("INTERVIEW_SCHEDULED", position.getName(), null, 0, 1);
        Page<ApplicationSummaryDTO> inTestingApplications = applicationService.getAllApplicationWithPagination("TESTING", position.getName(), null, 0, 1);
        Page<ApplicationSummaryDTO> inPendingApplications = applicationService.getAllApplicationWithPagination("PENDING", position.getName(), null, 0, 1);
        Page<ApplicationSummaryDTO> inProcessApplications = applicationService.getAllApplicationWithPagination("IN_PROCESS", position.getName(), null, 0, 1);
        Page<ApplicationSummaryDTO> applications = applicationService.getAllApplicationWithPagination(status, position.getName(), search, offset, pageSize);

        PositionReportDTO positionDetails = new PositionReportDTO();
        positionDetails.setPositionName(position.getName());
        positionDetails.setTotalApplications(totalApplications.getTotalElements());
        positionDetails.setPassedApplications(passedApplications.getTotalElements());
        positionDetails.setFailedApplications(failedApplications.getTotalElements());
        positionDetails.setInInterview(inInterviewApplications.getTotalElements());
        positionDetails.setInTesting(inTestingApplications.getTotalElements());
        positionDetails.setInProcess(inProcessApplications.getTotalElements());
        positionDetails.setInPending(inPendingApplications.getTotalElements());
        positionDetails.setCandidates(applications.getContent());

        return positionDetails;
    }
}