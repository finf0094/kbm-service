package kz.qbm.app.service;

import kz.qbm.app.dto.user.UserUpdateDTO;
import kz.qbm.app.exception.BadRequestException;
import kz.qbm.app.exception.InvalidVideoFileException;
import kz.qbm.app.repository.UserRepository;
import kz.qbm.app.dto.auth.CreateUserRequest;
import kz.qbm.app.dto.user.UserSummaryDTO;
import kz.qbm.app.entity.User;
import kz.qbm.app.exception.NotFoundException;
import kz.qbm.app.exception.RequestExistException;
import kz.qbm.app.mapper.UserMapper;
import kz.qbm.app.service.storage.StorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    // SERVICES
    private final RoleService roleService;
    private final StorageService storageService;

    // REPOSITORIES
    private final UserRepository userRepository;

    // MAPPERS
    private final UserMapper userMapper;

    // UTILS
    private final PasswordEncoder passwordEncoder;

    public Page<UserSummaryDTO> getAllUsers(int offset, int pageSize) {
        Page<User> users = userRepository.findAll(PageRequest.of(offset, pageSize));
        return users.map(userMapper::convertToUserSummaryDTO);
    }

    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }

    public Optional<User> getUserByItin(String itin) {
        return userRepository.findByItin(itin);
    }

    public User createUser(CreateUserRequest createUserRequest) {
        if (userRepository.existsByItin(createUserRequest.getItin())) {
            throw new RequestExistException("User with ITIN " + createUserRequest.getItin() + " already exists");
        }
        if (userRepository.existsByEmail(createUserRequest.getEmail())) {
            throw new RequestExistException("User with EMAIL " + createUserRequest.getEmail() + " already exists");
        }

        User user = User.builder()
                .itin(createUserRequest.getItin())
                .email(createUserRequest.getEmail())
                .roles(List.of(roleService.findByName("ROLE_USER")))
                .firstname("")
                .lastname("")
                .phoneNumber("")
                .aboutMe("")
                .password(passwordEncoder.encode(createUserRequest.getPassword()))
                .build();

        return userRepository.save(user);
    }

    public User updateUser(Long userId, UserUpdateDTO userUpdateDTO) {
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(String.format("User with id: %s not found", userId)));

        // Update the fields with values from UserUpdateDTO
        BeanUtils.copyProperties(userUpdateDTO, existingUser, "id", "password", "createdAt", "updatedAt", "resumeUrl");

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
        }

        user.setResumeUrl(null);
        return userRepository.save(user);
    }
}
