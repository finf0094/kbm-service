package kz.qbm.app.service.application;

import kz.qbm.app.dto.Message;
import kz.qbm.app.entity.application.Education;
import kz.qbm.app.exception.NotFoundException;
import kz.qbm.app.repository.application.EducationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EducationService {
    private final EducationRepository educationRepository;

    public Message deleteEducation(Long educationId) {
        Education education = educationRepository.findById(educationId)
                .orElseThrow(() -> new NotFoundException(String.format("Education with id: %s does not exist", educationId)));

        educationRepository.delete(education);

        return new Message(200, "Education deleted successfully");
    }
}
