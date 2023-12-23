package kz.qbm.app.repository;
import kz.qbm.app.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    boolean existsByItin(String itin);
    boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);
    Optional<User> findByItin(String itin);
    Page<User> findAll(Pageable pageable);
}
