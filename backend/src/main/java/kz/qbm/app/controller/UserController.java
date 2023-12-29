package kz.qbm.app.controller;

import kz.qbm.app.dto.Message;
import kz.qbm.app.dto.user.UserSummaryDTO;
import kz.qbm.app.dto.user.UserUpdateDTO;
import kz.qbm.app.entity.User;
import kz.qbm.app.exception.NotFoundException;
import kz.qbm.app.exception.UnknownParameterException;
import kz.qbm.app.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {
    // SERVICES
    private final UserService userService;

        @GetMapping
        public Page<UserSummaryDTO> getAllUsers(
                @RequestParam(name = "role", required = false) String roleName,
                @RequestParam(name = "search", required = false) String search,
                @RequestParam(name = "offset", defaultValue = "0") int offset,
                @RequestParam(name = "pageSize", defaultValue = "10") int pageSize) {
            return userService.getAllUsers(roleName, search, offset, pageSize);
        }

    @GetMapping("/getUser")
    public User getUser(@RequestParam(required = false) Long id,
                        @RequestParam(required = false) String itin) {
        if (id != null) {
            return userService.getUserById(id).orElseThrow(
                    () -> new NotFoundException("User with ID " + id + " does not exist")
            );
        } else if (itin != null) {
            return userService.getUserByItin(itin).orElseThrow(
                    () -> new NotFoundException("User with ITIN " + itin + " does not exist")
            );
        } else {
            throw new UnknownParameterException("Either 'id' or 'itin' parameter is required.");
        }
    }

    @PutMapping("/{userId}")
    public User updateUser(@PathVariable Long userId, @RequestBody UserUpdateDTO userUpdateDTO) {
        return userService.updateUser(userId, userUpdateDTO);
    }

    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
    }

    @PostMapping("/{userId}/uploadResume")
    public Message handleResumeUpload(@PathVariable Long userId, @RequestParam("file") MultipartFile file) {

        userService.uploadResume(userId, file);

        return new Message(HttpStatus.OK.value(), "Resume successfully uploaded " + file.getOriginalFilename() + "!");
    }

    @DeleteMapping("/{userId}/deleteResume")
    public Message handleResumeDelete(@PathVariable Long userId) {
        userService.deleteResume(userId);

        return new Message(HttpStatus.OK.value(), "Resume successfully deleted !");
    }

}
