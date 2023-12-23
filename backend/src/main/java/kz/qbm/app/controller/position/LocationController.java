package kz.qbm.app.controller.position;

import kz.qbm.app.dto.position.LocationSummaryDTO;
import kz.qbm.app.entity.position.Location;
import kz.qbm.app.exception.NotFoundException;
import kz.qbm.app.service.position.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/locations")
@RequiredArgsConstructor
public class LocationController {

    private final LocationService locationService;

    @GetMapping
    public List<LocationSummaryDTO> getAllLocation() {
        return locationService.getAllLocations();
    }

    @GetMapping("/getLocation")
    public Location getLocation(@RequestParam("id") Long id) {
        return locationService.getLocationById(id).orElseThrow(
                () -> new NotFoundException(String.format("Location with id %s not found", id))
        );
    }

    @PostMapping("/{locationName}")
    public Location createLocation(@PathVariable String locationName) {
        return locationService.createLocation(locationName);
    }

}
