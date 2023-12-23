package kz.qbm.app.mapper;

import kz.qbm.app.dto.user.UserSummaryDTO;
import kz.qbm.app.entity.Role;
import kz.qbm.app.entity.User;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class UserMapper {
    public UserSummaryDTO convertToUserSummaryDTO(User user) {
        return UserSummaryDTO.builder()
                .id(user.getId())
                .itin(user.getItin())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .email(user.getEmail())
                .position(user.getPosition())
                .phoneNumber(user.getPhoneNumber())
                .roles(user.getRoles().stream().map(Role::getName).collect(Collectors.toList()))
                .build();
    }
}
