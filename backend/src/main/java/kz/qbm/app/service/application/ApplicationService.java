package kz.qbm.app.service.application;

import jakarta.transaction.Transactional;
import kz.qbm.app.dto.Message;
import kz.qbm.app.dto.application.ApplicationSummaryDTO;
import kz.qbm.app.dto.kafka.interview.InterviewEmployeeEmail;
import kz.qbm.app.dto.kafka.interview.ScheduleInterviewDetails;
import kz.qbm.app.dto.kafka.test.TestEmployeeEmail;
import kz.qbm.app.entity.User;
import kz.qbm.app.entity.application.*;
import kz.qbm.app.entity.position.Position;
import kz.qbm.app.entity.quiz.Quiz;
import kz.qbm.app.exception.*;
import kz.qbm.app.mapper.applicaiton.ApplicationMapper;
import kz.qbm.app.repository.application.ApplicationRepository;
import kz.qbm.app.repository.application.EmployeeRepository;
import kz.qbm.app.service.UserService;
import kz.qbm.app.service.kafka.ProducerService;
import kz.qbm.app.service.position.PositionService;
import kz.qbm.app.service.quiz.QuizService;
import kz.qbm.app.service.quiz.room.QuizSessionService;
import kz.qbm.app.service.storage.FileSystemStorageService;
import kz.qbm.app.specification.ApplicationSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ApplicationService {
    // REPOSITORIES
    private final EmployeeRepository employeeRepository;
    private final ApplicationRepository applicationRepository;

    // MAPPERS
    private final ApplicationMapper applicationMapper;

    // SERVICES
    private final QuizService quizService;
    private final UserService userService;
    private final ProducerService producerService;
    private final PositionService positionService;
    private final EducationService educationService;
    private final ExperienceService experienceService;
    private final QuizSessionService quizSessionService;
    private final FileSystemStorageService fileSystemStorageService;

    public Optional<Application> getApplicationById(String applicationId) {
        return applicationRepository.findById(applicationId);
    }

    public Optional<Application> getApplicationByUserId(Long userId) {
        return applicationRepository.findByUserId(userId);
    }

    public Page<ApplicationSummaryDTO> getAllApplicationWithPagination(String status, String search, int offset, int pageSize) {
        ApplicationStatus applicationStatus;

        try {
            applicationStatus = ApplicationStatus.valueOf(status);
        } catch (IllegalArgumentException e) {
            throw new UnknownParameterException(String.format("Unknown parameters: %s", status));
        }

        Specification<Application> spec = Specification.where(ApplicationSpecification.hasStatus(applicationStatus))
                .and(ApplicationSpecification.search(search));

        Page<Application> applications = applicationRepository.findAll(spec, PageRequest.of(offset, pageSize));

        return applications.map(applicationMapper::convertToApplicationSummaryDTO);
    }

    public Application createApplication(Long userId) {
        if (applicationRepository.findByUserId(userId).isPresent()) {
            throw new RequestExistException("У пользователя уже имеется заявка!");
        }
        User user = userService.getUserById(userId).orElseThrow(
                () -> new NotFoundException(String.format("User with id: %s not found", userId))
        );
        Application application = new Application();
        application.setStatus(ApplicationStatus.IN_PROCESS);
        application.setUser(user);

        return applicationRepository.save(application);
    }

    public Application setEmployee(String applicationId, Employee employee) {
        try {
            Application application = applicationRepository.findById(applicationId)
                    .orElseThrow(() -> new NotFoundException(String.format("Application with id: %s does not exist", applicationId)));

            if (application.getStatus() != ApplicationStatus.IN_PROCESS) {
                throw new BadRequestException("Application is not in process and cannot be moved to testing.");
            }

            Employee newEmployee = employeeRepository.save(employee);
            application.setEmployee(newEmployee);
            return applicationRepository.save(application);
        } catch (DataIntegrityViolationException e) {

            String keyDetails = extractKeyValueFromErrorMessage(e.getCause().getMessage());
            throw new RequestExistException(
                    String.format("Duplicate key violation. %s.", keyDetails)
            );
        }
    }

    public Application setDesiredPosition(String applicationId, Long positionId) {
        Application application = applicationRepository.findById(applicationId).orElseThrow(
                () -> new NotFoundException(String.format("Application with id: %s does not exist", applicationId))
        );

        Position position = positionService.getPositionById(positionId).orElseThrow(
                () -> new NotFoundException(String.format("Position with id %s not found", positionId))
        );

        if (application.getStatus() != ApplicationStatus.IN_PROCESS) {
            throw new BadRequestException("Application is not in process and cannot be moved to testing.");
        }

        List<Position> desiredPositions = application.getDesiredPositions();

        if (desiredPositions.size() >= 2)
            throw new RequestExistException("You cannot select more than 2 items!");
        else if (desiredPositions.contains(position))
            throw new RequestExistException("You have already chosen");

        desiredPositions.add(position);
        application.setDesiredPositions(desiredPositions);
        return applicationRepository.save(application);
    }

    public Message deleteDesiredPosition(String applicationId, Long positionId) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new NotFoundException(String.format("Application with id: %s does not exist", applicationId)));

        if (application.getStatus() != ApplicationStatus.IN_PROCESS) {
            throw new BadRequestException("Application is not in process and cannot be moved to testing.");
        }

        List<Position> desiredPositions = application.getDesiredPositions();

        // Find the Position with the given positionId
        Position positionToDelete = desiredPositions.stream()
                .filter(position -> position.getId().equals(positionId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException(String.format("Desired position with id: %s does not exist", positionId)));

        // Remove the Position from the list
        desiredPositions.remove(positionToDelete);

        // Update the Application entity in the database
        applicationRepository.save(application);
        return new Message(HttpStatus.OK.value(), "desired position deleted successfully");
    }

    public Application setExperience(String applicationId, Experience experience) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new NotFoundException(String.format("Application with id: %s does not exist", applicationId))
                );

        if (application.getStatus() != ApplicationStatus.IN_PROCESS) {
            throw new BadRequestException("Application is not in process and cannot be moved to testing.");
        }

        List<Experience> experiences = application.getExperiences();
        experiences.add(experience);
        application.setExperiences(experiences);

        return applicationRepository.save(application);
    }

    public Message deleteExperience(Long experienceId) {
        return experienceService.deleteExperience(experienceId);
    }

    public Application setEducation(String applicationId, Education education) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new NotFoundException(String.format("Application with id: %s does not exist", applicationId))
                );

        if (application.getStatus() != ApplicationStatus.IN_PROCESS) {
            throw new BadRequestException("Application is not in process and cannot be moved to testing.");
        }

        List<Education> educations = application.getEducations();
        educations.add(education);
        application.setEducations(educations);

        return applicationRepository.save(application);
    }

    public Message deleteEducation(Long educationId) {
        return educationService.deleteEducation(educationId);
    }

    public Application uploadVideo(String applicationId, MultipartFile videoFile) {
        // Check the file is a video
        String contentType = videoFile.getContentType();
        if (contentType == null || !contentType.startsWith("video/")) {
            throw new InvalidVideoFileException("Uploaded file is not a video");
        }

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new NotFoundException(String.format("Application with id: %s does not exist", applicationId)));

        if (application.getStatus() != ApplicationStatus.IN_PROCESS) {
            throw new BadRequestException("Application is not in process and cannot be upload video.");
        }

        String videoFilename = fileSystemStorageService.store(videoFile);

        String videoUrl = "/storage/" + videoFilename;

        application.setVideoUrl(videoUrl);

        return applicationRepository.save(application);
    }

    @Transactional
    public Application startTesting(Long userId) {
        Application application = getApplicationByUserId(userId).orElseThrow(
                () -> new NotFoundException(String.format("Application for user with id: %s does not exist", userId))
        );

        if (application.getStatus() != ApplicationStatus.IN_PROCESS) {
            throw new BadRequestException("Application is not in process and cannot be moved to testing.");
        }

        TestEmployeeEmail testEmployeeEmail = new TestEmployeeEmail(
                application.getUser().getEmail(),
                "KBM",
                "subject",
                "content",
                application.getUser().getFirstname(),
                List.of("185.125.91.161:3000/quiz-sessions")
        );

        producerService.sendTestEmail(testEmployeeEmail);

        application.setStatus(ApplicationStatus.TESTING);
        application = applicationRepository.save(application);

        List<Position> desiredPositions = application.getDesiredPositions();
        for (Position position : desiredPositions) {
            Quiz quiz = quizService.getQuizByPosition(position);
            quizSessionService.createSession(userId, quiz.getQuizId());
        }

        return application;
    }

    public Application approve(String applicationId) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new NotFoundException("Application not found"));
        application.setStatus(ApplicationStatus.APPROVED);
        return applicationRepository.save(application);
    }

    public Application reject(String applicationId) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new NotFoundException("Application not found"));
        application.setStatus(ApplicationStatus.REJECTED);
        return applicationRepository.save(application);
    }

    public Application scheduleAnInterview(String applicationId, ScheduleInterviewDetails scheduleInterviewDetails) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new NotFoundException("Application not found"));
        application.setStatus(ApplicationStatus.INTERVIEW_SCHEDULED);

        InterviewEmployeeEmail interviewEmployeeEmail =
                new InterviewEmployeeEmail(
                        application.getUser().getEmail(),
                        "KBM CORP.",
                        "subject",
                        "content",
                        application.getUser().getFirstname(),
                        scheduleInterviewDetails.getPosition(),
                        scheduleInterviewDetails.getFormat(),
                        scheduleInterviewDetails.getVenue(),
                        scheduleInterviewDetails.getTime()
                );

        producerService.sendInterviewEmail(interviewEmployeeEmail);

        return applicationRepository.save(application);
    }

    // Extract key value from the error message
    private String extractKeyValueFromErrorMessage(String errorMessage) {
        // Adjust the regular expression based on the actual format of the error message
        String keyPattern = "Key \\((phone_number|personnel_number)\\)=\\(([^)]+)\\)";
        java.util.regex.Pattern pattern = java.util.regex.Pattern.compile(keyPattern);
        java.util.regex.Matcher matcher = pattern.matcher(errorMessage);
        if (matcher.find()) {
            // Group 1 corresponds to the field name, and Group 2 corresponds to the key value
            String fieldName = matcher.group(1);
            String keyValue = matcher.group(2);
            return fieldName + ": " + keyValue;
        } else {
            return "N/A";
        }
    }


}
