package kz.qbm.app.repository;
import kz.qbm.app.entity.User;
import kz.qbm.app.entity.application.Application;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
    boolean existsByItin(String itin);
    boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);
    Optional<User> findByItin(String itin);

    @Override
    Page<User> findAll(Specification<User> spec, Pageable pageable);
}
