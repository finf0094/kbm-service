package kz.qbm.app.mapper.applicaiton;

import kz.qbm.app.dto.application.ApplicationSummaryDTO;
import kz.qbm.app.entity.application.Application;
import kz.qbm.app.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
public class ApplicationMapper {

    // MAPPERS
    private final UserMapper userMapper;

    public ApplicationSummaryDTO convertToApplicationSummaryDTO(Application application) {
        ApplicationSummaryDTO applicationSummaryDTO = new ApplicationSummaryDTO();
        applicationSummaryDTO.setId(application.getId());
        applicationSummaryDTO.setStatus(application.getStatus());
        applicationSummaryDTO.setUser(userMapper.convertToUserSummaryDTO(application.getUser()));
        return applicationSummaryDTO;
    }


}
