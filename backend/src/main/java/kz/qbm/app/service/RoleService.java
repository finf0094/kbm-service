package kz.qbm.app.service;

import kz.qbm.app.repository.RoleRepository;
import kz.qbm.app.entity.Role;
import kz.qbm.app.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoleService {
    private final RoleRepository roleRepository;

    public Role findByName(String name) {
        return roleRepository.findByName(name).orElseThrow(
                () -> new NotFoundException(String.format("Role with name %s not found", name))
        );
    }

}
