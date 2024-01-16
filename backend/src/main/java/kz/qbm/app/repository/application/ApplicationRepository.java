package kz.qbm.app.repository.application;

import kz.qbm.app.entity.application.Application;
import kz.qbm.app.entity.application.ApplicationStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, String>, JpaSpecificationExecutor<Application> {
    Optional<Application> findByUserId(Long userId);

    long count(Specification<Application> spec);

    Page<Application> findAllByStatusIs(ApplicationStatus status, Pageable pageable);
}
