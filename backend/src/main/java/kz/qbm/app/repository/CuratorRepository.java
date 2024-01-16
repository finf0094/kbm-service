package kz.qbm.app.repository;


import kz.qbm.app.entity.Curator;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CuratorRepository extends JpaRepository<Curator, Long>, JpaSpecificationExecutor<Curator> {
}
