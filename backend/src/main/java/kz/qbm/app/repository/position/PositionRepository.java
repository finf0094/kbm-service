package kz.qbm.app.repository.position;

import kz.qbm.app.entity.position.Position;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PositionRepository extends JpaRepository<Position, Long> {
    Optional<List<Position>> findAllByDepartment_Id(Long departmentId);
}
