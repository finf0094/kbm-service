package kz.qbm.app.service.position;

import kz.qbm.app.entity.position.Location;
import kz.qbm.app.exception.BadRequestException;
import kz.qbm.app.repository.position.LocationRepository;
import kz.qbm.app.specification.position.LocationSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;


import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LocationService {
    private final LocationRepository locationRepository;

    public Optional<Location> getLocationById(Long locationId) {
        return locationRepository.findById(locationId);
    }

    public Page<Location> getAllLocationsWithPaginationAndSearch(String search, int offset, int pageSize) {
        Specification<Location> spec = LocationSpecification.search(search);

        return locationRepository.findAll(spec, PageRequest.of(offset, pageSize));
    }

    public Location createLocation(String locationName) {
        Location location = new Location();
        location.setName(locationName);
        return locationRepository.save(location);
    }

    public Location updateLocation(Long locationId, String newName) {
        Location location = locationRepository.findById(locationId)
                .orElseThrow(() -> new RuntimeException("Location not found with id: " + locationId));

        location.setName(newName);
        return locationRepository.save(location);
    }

    public void deleteLocationById(Long locationId) {
        Location location = locationRepository.findById(locationId)
                .orElseThrow(() -> new RuntimeException("Location not found with id: " + locationId));

        if (!location.getDepartments().isEmpty()) {
            throw new BadRequestException("Cannot delete location with existing departments. Please delete all departments associated with this location first.");
        }

        locationRepository.deleteById(locationId);
    }

}
