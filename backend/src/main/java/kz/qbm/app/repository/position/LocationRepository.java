package kz.qbm.app.repository.position;

import kz.qbm.app.dto.position.LocationSummaryDTO;
import kz.qbm.app.entity.position.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
    @Query("SELECT new kz.qbm.app.dto.position.LocationSummaryDTO(l.id, l.name) FROM Location l")
    List<LocationSummaryDTO> findAllLocationSummaries();
}
