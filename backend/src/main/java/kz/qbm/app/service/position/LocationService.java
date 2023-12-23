package kz.qbm.app.service.position;

import kz.qbm.app.dto.position.LocationSummaryDTO;
import kz.qbm.app.entity.position.Location;
import kz.qbm.app.repository.position.LocationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LocationService {
    private final LocationRepository locationRepository;

    public Optional<Location> getLocationById(Long locationId) {
        return locationRepository.findById(locationId);
    }

    public List<LocationSummaryDTO> getAllLocations() {
        return locationRepository.findAllLocationSummaries();
    }

    public Location createLocation(String locationName) {
        Location location = new Location();
        location.setName(locationName);
        return locationRepository.save(location);
    }

}
