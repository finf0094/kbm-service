package kz.qbm.app.config;

import kz.qbm.app.repository.UserRepository;
import kz.qbm.app.entity.User;
import kz.qbm.app.exception.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class CustomUserDetailsService implements UserDetailsService {

    // REPOSITORIES
    @Autowired
    private UserRepository userRepository;


    @Override
    public CustomUserDetails loadUserByUsername(String itin) throws UsernameNotFoundException {

        User user = userRepository.findByItin(itin).orElseThrow(
                () -> new NotFoundException(String.format("user with itin %s not found", itin))
        );

        return new CustomUserDetails(
                user.getId(),
                user.getItin(),
                user.getPassword(),
                user.getEmail(),
                user.getRoles().stream()
                        .map(role -> new SimpleGrantedAuthority(role.getName()))
                        .collect(Collectors.toList())
        );

    }
}
