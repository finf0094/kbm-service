package kz.qbm.app.service;

import kz.qbm.app.dto.user.UserDTO;
import kz.qbm.app.repository.UserRepository;
import kz.qbm.app.config.CustomUserDetails;
import kz.qbm.app.config.CustomUserDetailsService;
import kz.qbm.app.dto.Message;
import kz.qbm.app.dto.auth.AuthRequest;
import kz.qbm.app.dto.auth.AuthResponse;
import kz.qbm.app.dto.auth.CreateUserRequest;
import kz.qbm.app.dto.user.UserResponse;
import kz.qbm.app.entity.User;
import kz.qbm.app.exception.AuthenticationException;
import kz.qbm.app.exception.NotFoundException;
import kz.qbm.app.exception.RequestExistException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    // REPOSITORIES
    private final UserRepository userRepository;

    // SERVICES
    private final JwtService jwtService;
    private final UserService userService;
    private final RoleService roleService;
    private final CustomUserDetailsService customUserDetailsService;

    // UTILS
    private final AuthenticationManager authenticationManager;


    // TOKENS WHICH SAVE IN MEMORY
    private final Map<String, String> userRefreshTokenMap = new HashMap<>();


    public ResponseEntity<?> registerUser(CreateUserRequest registerRequest) {

        UserDTO userDTO = UserDTO.builder()
                .password(registerRequest.getPassword())
                .itin(registerRequest.getItin())
                .email(registerRequest.getEmail())
                .firstname("")
                .lastname("")
                .aboutMe("")
                .phoneNumber("")
                .roles(List.of(roleService.findByName("ROLE_USER")))
                .position(null)
                .build();

        User createdUser = userService.createUser(userDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(
                new Message(201, String.format("User with itin %s successfully created", createdUser.getItin()))
        );
    }


    public ResponseEntity<?> loginUser(AuthRequest authRequest) {

            try {
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                        authRequest.getItin(), authRequest.getPassword()
                ));
            }  catch (BadCredentialsException e) {
                throw new AuthenticationException("Пароль неправильный", HttpStatus.UNAUTHORIZED);
            }

                CustomUserDetails userDetails = customUserDetailsService.loadUserByUsername(authRequest.getItin());

                Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);

                String accessToken = jwtService.generateAccessToken(userDetails);
                String refreshToken = jwtService.generateRefreshToken(userDetails);

                userRefreshTokenMap.put(userDetails.getItin(), refreshToken);

                UserResponse userResponse = createUserResponse(userDetails);

                AuthResponse authResponse = AuthResponse.builder()
                        .access_token(accessToken)
                        .refresh_token(refreshToken)
                        .user(userResponse)
                        .build();

                return ResponseEntity.ok(authResponse);
    }

    public ResponseEntity<?> getAccessTokenByRefreshToken(String refreshToken) {
        String itin = jwtService.getRefreshTokenItin(refreshToken);
        if (jwtService.isRefreshTokenValid(refreshToken) && userRefreshTokenMap.containsKey(itin)) {

            User user = userRepository.findByItin(itin).orElseThrow(
                    () -> new NotFoundException(String.format("User with itin %s not found", itin))
            );

            CustomUserDetails userDetails = new CustomUserDetails(
                    user.getId(),
                    user.getItin(),
                    user.getPassword(),
                    user.getEmail(),
                    user.getRoles().stream()
                            .map(role -> new SimpleGrantedAuthority(role.getName()))
                            .collect(Collectors.toList())
            );

            String accessToken = jwtService.generateAccessToken(userDetails);

            UserResponse userResponse = createUserResponse(userDetails);

            AuthResponse authResponse = AuthResponse.builder()
                    .access_token(accessToken)
                    .refresh_token(refreshToken)
                    .user(userResponse)
                    .build();

            return ResponseEntity.ok(authResponse);

        } else {
            throw new AuthenticationException("Invalid refresh token", HttpStatus.UNAUTHORIZED);
        }
    }

    private UserResponse createUserResponse(CustomUserDetails customUserDetails) {
        List<String> roleList = customUserDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();
        return UserResponse.builder()
                .id(customUserDetails.getId())
                .email(customUserDetails.getEmail())
                .itin(customUserDetails.getItin())
                .roles(roleList)
                .build();
    }
}
