package kz.qbm.app.service.application;

import kz.qbm.app.dto.Message;
import kz.qbm.app.entity.application.Experience;
import kz.qbm.app.exception.NotFoundException;
import kz.qbm.app.repository.application.ExperienceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ExperienceService {
    private final ExperienceRepository experienceRepository;

    public Message deleteExperience(Long experienceId) {
        Experience experience = experienceRepository.findById(experienceId)
                .orElseThrow(() -> new NotFoundException(String.format("Experience with id: %s does not exist", experienceId)));

        experienceRepository.delete(experience);

        return new Message(200, "Experience deleted successfully");
    }
}
