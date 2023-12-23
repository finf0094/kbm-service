package kz.qbm.app.repository.position;

import kz.qbm.app.dto.position.DepartmentSummaryDTO;
import kz.qbm.app.dto.position.LocationSummaryDTO;
import kz.qbm.app.entity.position.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
    @Query("SELECT new kz.qbm.app.dto.position.DepartmentSummaryDTO(d.id, d.name) " +
            "FROM Department d " +
            "WHERE d.location.id = :locationId")
    Optional<List<DepartmentSummaryDTO>> findAllByLocationId(Long locationId);

    @Query("SELECT new kz.qbm.app.dto.position.DepartmentSummaryDTO(l.id, l.name) FROM Department l")
    List<DepartmentSummaryDTO> findAllDepartmentSummaries();
}
