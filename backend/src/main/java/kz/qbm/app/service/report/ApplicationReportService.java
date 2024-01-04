package kz.qbm.app.service.report;

import kz.qbm.app.dto.application.ApplicationSummaryDTO;
import kz.qbm.app.dto.report.PositionReportDTO;
import kz.qbm.app.entity.application.Application;
import kz.qbm.app.entity.application.ApplicationStatus;
import kz.qbm.app.entity.position.Position;
import kz.qbm.app.exception.NotFoundException;
import kz.qbm.app.mapper.applicaiton.ApplicationMapper;
import kz.qbm.app.repository.application.ApplicationRepository;
import kz.qbm.app.repository.position.PositionRepository;
import kz.qbm.app.specification.ApplicationSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApplicationReportService {

    // REPOSITORIES
    private final PositionRepository positionRepository;
    private final ApplicationRepository applicationRepository;

    // MAPPER
    private final ApplicationMapper applicationMapper;

    public PositionReportDTO getPositionReport(Long positionId) {
        Position position = positionRepository.findById(positionId).orElseThrow(
                () -> new NotFoundException(String.format("Position with id %s not found", positionId))
        );

        long totalApplicationsCount = applicationRepository.count(ApplicationSpecification.hasPosition(position.getName()));
        long approvedApplicationsCount = applicationRepository.count(
                ApplicationSpecification.hasStatus(ApplicationStatus.APPROVED)
                        .and(ApplicationSpecification.hasPosition(position.getName()))
        );
        long rejectedApplicationsCount = applicationRepository.count(
                ApplicationSpecification.hasStatus(ApplicationStatus.REJECTED)
                        .and(ApplicationSpecification.hasPosition(position.getName()))
        );
        long testingApplicationsCount = applicationRepository.count(
                ApplicationSpecification.hasStatus(ApplicationStatus.TESTING)
                        .and(ApplicationSpecification.hasPosition(position.getName()))
        );
        long pendingApplicationsCount = applicationRepository.count(
                ApplicationSpecification.hasStatus(ApplicationStatus.PENDING)
                        .and(ApplicationSpecification.hasPosition(position.getName()))
        );
        long inProcessApplicationsCount = applicationRepository.count(
                ApplicationSpecification.hasStatus(ApplicationStatus.IN_PROCESS)
                        .and(ApplicationSpecification.hasPosition(position.getName()))
        );
        long interviewScheduledApplicationsCount = applicationRepository.count(
                ApplicationSpecification.hasStatus(ApplicationStatus.INTERVIEW_SCHEDULED)
                        .and(ApplicationSpecification.hasPosition(position.getName()))
        );

        List<Application> approvedApplications = applicationRepository.findAll(
                ApplicationSpecification.hasStatus(ApplicationStatus.APPROVED)
                        .and(ApplicationSpecification.hasPosition(position.getName()))
        );
        List<ApplicationSummaryDTO> candidates = approvedApplications.stream()
                .map(applicationMapper::convertToApplicationSummaryDTO)
                .collect(Collectors.toList());

        PositionReportDTO positionDetails = new PositionReportDTO();
        positionDetails.setPositionName(position.getName());
        positionDetails.setTotalApplications(totalApplicationsCount);
        positionDetails.setPassedApplications(approvedApplicationsCount);
        positionDetails.setFailedApplications(rejectedApplicationsCount);
        positionDetails.setInTesting(testingApplicationsCount);
        positionDetails.setInPending(pendingApplicationsCount);
        positionDetails.setInProcess(inProcessApplicationsCount);
        positionDetails.setInInterview(interviewScheduledApplicationsCount);
        positionDetails.setCandidates(candidates);
        return positionDetails;
    }
}