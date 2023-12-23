package kz.qbm.app.controller.position;

import kz.qbm.app.dto.position.CreateDepartmentRequestDTO;
import kz.qbm.app.dto.position.DepartmentSummaryDTO;
import kz.qbm.app.entity.position.Department;
import kz.qbm.app.exception.NotFoundException;
import kz.qbm.app.service.position.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/departments")
public class DepartmentController {

    private final DepartmentService departmentService;

    @PostMapping
    public Department createDepartment(@RequestBody CreateDepartmentRequestDTO createDepartmentRequestDto)
    {
        Department department = departmentService.createDepartment(
                createDepartmentRequestDto.getName(),
                createDepartmentRequestDto.getLocationId()
        );
        return department;
    }

    @GetMapping
    public List<DepartmentSummaryDTO> getAllDepartments(
            @RequestParam("locationId") Long locationId) {
        if (locationId != null) {
            return departmentService.getDepartmentsByLocationId(locationId).orElseThrow(
                    () -> new NotFoundException("departments not found")
            );
        }
        return departmentService.getAllDepartments();
    }

    @GetMapping("/{locationId}")
    public List<DepartmentSummaryDTO> getDepartmentsByLocation(@PathVariable Long locationId)
    {
        return departmentService.getDepartmentsByLocationId(locationId).orElseThrow(
                () -> new NotFoundException("departments not found")
        );
    }

}
