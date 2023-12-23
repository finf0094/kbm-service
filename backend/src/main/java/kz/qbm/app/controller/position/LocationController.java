package kz.qbm.app.controller.position;

import kz.qbm.app.dto.Message;
import kz.qbm.app.dto.position.LocationSummaryDTO;
import kz.qbm.app.entity.position.Location;
import kz.qbm.app.exception.NotFoundException;
import kz.qbm.app.service.position.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/locations")
@RequiredArgsConstructor
public class LocationController {

    private final LocationService locationService;

    @GetMapping
    public Page<Location> getAllLocation(
            @RequestParam(name = "search", defaultValue = "") String search,
            @RequestParam(name = "offset", defaultValue = "0") int offset,
            @RequestParam(name = "pageSize", defaultValue = "10") int pageSize) {
        return locationService.getAllLocationsWithPaginationAndSearch(search, offset, pageSize);
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

    @PutMapping("/{id}")
    public Location updateLocation(@PathVariable Long id, @RequestBody String newName) {
        return locationService.updateLocation(id, newName);
    }

    @DeleteMapping("/{id}")
    public Message deleteLocationById(@PathVariable Long id) {
        locationService.deleteLocationById(id);
        return new Message(HttpStatus.NO_CONTENT.value(), String.format("Location with id %s successfully deleted", id));
    }

}
