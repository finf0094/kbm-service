package kz.qbm.app.controller.application;

import kz.qbm.app.dto.Message;
import kz.qbm.app.dto.application.ApplicationSummaryDTO;
import kz.qbm.app.dto.kafka.interview.ScheduleInterviewDetails;
import kz.qbm.app.entity.application.Application;
import kz.qbm.app.entity.application.Education;
import kz.qbm.app.entity.application.Employee;
import kz.qbm.app.entity.application.Experience;
import kz.qbm.app.exception.NotFoundException;
import kz.qbm.app.exception.UnknownParameterException;
import kz.qbm.app.service.application.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class ApplicationController {

    //SERVICES
    private final ApplicationService applicationService;

    @GetMapping
    public Page<ApplicationSummaryDTO> getAllApplicationWithPagination(
            @RequestParam(name = "status") String status,
            @RequestParam(name = "search", defaultValue = "") String search,
            @RequestParam(name = "offset", defaultValue = "0") int offset,
            @RequestParam(name = "pageSize", defaultValue = "10") int pageSize) {
        return applicationService.getAllApplicationWithPagination(status, search, offset, pageSize);
    }

    @GetMapping("/getApplication")
    public Application getApplicationById(
            @RequestParam(required = false) String applicationId,
            @RequestParam(required = false) Long userId) {
        if (applicationId != null) {
            return applicationService.getApplicationById(applicationId).orElseThrow(
                    () -> new NotFoundException(String.format("Application with id: %s not found", applicationId))
            );
        } else if (userId != null) {
            return applicationService.getApplicationByUserId(userId).orElseThrow(
                    () -> new NotFoundException(String.format("This user with id: %s doesn't have application", userId))
            );
        } else {
            throw new UnknownParameterException("Either 'applicationId' or 'userId' parameter is required.");
        }
    }

    @PostMapping("/{userId}")
    public Application createApplication(@PathVariable Long userId) {
        return applicationService.createApplication(userId);
    }

    @PostMapping("{applicationId}/setEmployee")
    public Application setEmployee(@PathVariable String applicationId, @RequestBody Employee employee) {
        return applicationService.setEmployee(applicationId, employee);
    }

    @PostMapping("/{applicationId}/setDesiredPosition/{positionId}")
    public Application setDesiredPosition(@PathVariable String applicationId, @PathVariable Long positionId) {
        return applicationService.setDesiredPosition(applicationId, positionId);
    }

    @DeleteMapping("/{applicationId}/deleteDesiredPosition/{positionId}")
    public Message deleteDesiredPosition(@PathVariable String applicationId, @PathVariable Long positionId) {
        return applicationService.deleteDesiredPosition(applicationId, positionId);
    }

    @PostMapping("/{applicationId}/setExperience")
    public Application setExperience(@PathVariable String applicationId, @RequestBody Experience experience) {
        return applicationService.setExperience(applicationId, experience);
    }

    @PostMapping("/{applicationId}/setEducation")
    public Application setEducation(@PathVariable String applicationId, @RequestBody Education education) {
        return applicationService.setEducation(applicationId, education);
    }

    @DeleteMapping("/{experienceId}/deleteExperience")
    public Message deleteExperience(@PathVariable Long experienceId) {
        return applicationService.deleteExperience(experienceId);
    }

    @DeleteMapping("/{educationId}/deleteEducation")
    public Message deleteEducation(@PathVariable Long educationId) {
        return applicationService.deleteEducation(educationId);
    }

    @PostMapping("/{applicationId}/uploadVideo")
    public Application uploadVideo(@PathVariable String applicationId, @RequestParam("video") MultipartFile videoFile) {
        return applicationService.uploadVideo(applicationId, videoFile);
    }

    @PostMapping("/{userId}/startTesting")
    public Application startTesting(@PathVariable Long userId) {
        return applicationService.startTesting(userId);
    }

    @PostMapping("/{applicationId}/scheduleAnInterview")
    public Application scheduleAnInterview(@PathVariable String applicationId, ScheduleInterviewDetails scheduleInterviewDetails) {
        return applicationService.scheduleAnInterview(applicationId, scheduleInterviewDetails);
    }

    @PostMapping("{applicationId}/approve")
    public Application approve(@PathVariable String applicationId) {
        
        return applicationService.approve(applicationId);
    }

    @PostMapping("{applicationId}/reject")
    public Application reject(@PathVariable String applicationId) {
        return applicationService.reject(applicationId);
    }

}
