package kz.qbm.app.controller;
import kz.qbm.app.dto.auth.AuthRequest;
import kz.qbm.app.dto.auth.CreateUserRequest;
import kz.qbm.app.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    // SERVICES
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody CreateUserRequest registerRequest) {
        return authService.registerUser(registerRequest);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody AuthRequest authRequest) {
        return authService.loginUser(authRequest);
    }

    @GetMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestParam String token) {
        return authService.getAccessTokenByRefreshToken(token);
    }
}
