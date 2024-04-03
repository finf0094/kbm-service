package kz.qbm.app.service;

import kz.qbm.app.dto.user.UserDTO;
import kz.qbm.app.entity.position.Position;
import kz.qbm.app.exception.BadRequestException;
import kz.qbm.app.repository.UserRepository;
import kz.qbm.app.dto.auth.CreateUserRequest;
import kz.qbm.app.dto.user.UserSummaryDTO;
import kz.qbm.app.entity.User;
import kz.qbm.app.exception.NotFoundException;
import kz.qbm.app.exception.RequestExistException;
import kz.qbm.app.mapper.UserMapper;
import kz.qbm.app.repository.position.PositionRepository;
import kz.qbm.app.service.storage.StorageService;
import kz.qbm.app.specification.UserSpecification;
import kz.qbm.app.utils.NullAwareBeanUtilsBean;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    // SERVICES
    private final StorageService storageService;

    // REPOSITORIES
    private final UserRepository userRepository;
    private final PositionRepository positionRepository;

    // MAPPERS
    private final UserMapper userMapper;

    // UTILS
    private final PasswordEncoder passwordEncoder;
    private final NullAwareBeanUtilsBean nullAwareBeanUtilsBean;

    public Page<UserSummaryDTO> getAllUsers(String roleName, String search, int offset, int pageSize) {
        Specification<User> spec = Specification.where(null);

        if (search != null && !search.isEmpty()) spec = spec.and(UserSpecification.search(search));
        if (roleName != null && !roleName.isEmpty()) spec = spec.and(UserSpecification.hasRole(roleName));

        Page<User> users = userRepository.findAll(spec, PageRequest.of(offset, pageSize));

        return users.map(userMapper::convertToUserSummaryDTO);
    }

    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }

    public Optional<User> getUserByItin(String itin) {
        return userRepository.findByItin(itin);
    }

    public User createUser(UserDTO userDTO) {
        if (userRepository.existsByItin(userDTO.getItin())) {
            throw new RequestExistException("Пользователь с таким ИИН уже существует");
        }
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new RequestExistException("Пользователь с таким Email уже существует");
        }

        Position position = null;

        if (userDTO.getPosition() != null) {
            position = positionRepository.findById(userDTO.getPosition().getId()).orElseThrow(
                    () -> new NotFoundException(String.format("position with id %s not found", userDTO.getPosition().getId()))
            );
        }

        User user = User.builder()
                .itin(userDTO.getItin())
                .email(userDTO.getEmail())
                .roles(userDTO.getRoles())
                .firstname(userDTO.getFirstname())
                .lastname(userDTO.getLastname())
                .phoneNumber(userDTO.getPhoneNumber())
                .position(position)
                .aboutMe("")
                .password(passwordEncoder.encode(userDTO.getPassword()))
                .build();

        return userRepository.save(user);
    }

    public User updateUser(Long userId, UserDTO userUpdateDTO) {
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(String.format("User with id: %s not found", userId)));

        try {
            nullAwareBeanUtilsBean.copyProperties(existingUser, userUpdateDTO);
        } catch (IllegalAccessException | InvocationTargetException e) {
            throw new BadRequestException("Updating user failed: " + e.getMessage());
        }

        // If password is provided, encode it and set it
        if (userUpdateDTO.getPassword() != null) {
            existingUser.setPassword(passwordEncoder.encode(userUpdateDTO.getPassword()));
        }

        // Save the updated user
        return userRepository.save(existingUser);
    }

    public void deleteUser(Long userId) {
        User user = getUserById(userId).orElseThrow(
                () -> new NotFoundException(String.format("User with id: %s not found", userId))
        );

        userRepository.delete(user);
    }

    public User uploadResume(Long userId, MultipartFile file) {
        // Check the file is a pdf
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("application/pdf")) {
            throw new BadRequestException("Uploaded file is not a pdf");
        }

        User user = getUserById(userId).orElseThrow(
                () -> new NotFoundException(String.format("User with id: %s not found", userId))
        );

        String filename = storageService.store(file);
        String resumeUrl = "storage/" + filename;
        user.setResumeUrl(resumeUrl);

        return userRepository.save(user);
    }

    public User deleteResume(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new NotFoundException(String.format("User with id: %s not found", userId))
        );

        String resumeUrl = user.getResumeUrl();
        if (resumeUrl.startsWith("storage/")) {
            String filename = resumeUrl.substring("storage/".length());
            storageService.delete(filename);
            user.setResumeUrl(null);
        }

        return userRepository.save(user);
    }

}
