package kz.qbm.app.controller.position;

import kz.qbm.app.dto.Message;
import kz.qbm.app.dto.position.CreateDepartmentRequestDTO;
import kz.qbm.app.dto.position.DepartmentSummaryDTO;
import kz.qbm.app.entity.position.Department;
import kz.qbm.app.exception.NotFoundException;
import kz.qbm.app.service.position.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
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

    @PutMapping("/{id}")
    public Department updateDepartment(@PathVariable Long id, @RequestBody String newName) {
        return departmentService.updateDepartment(id, newName);
    }

    @GetMapping("/getDepartment")
    public Department getDepartmentById(@RequestParam(name = "id") Long departmentId) {
        return departmentService.getDepartmentById(departmentId).orElseThrow(
                () -> new NotFoundException(String.format("Department with id %s not found", departmentId))
        );
    }

    @GetMapping
    public Page<DepartmentSummaryDTO> getAllDepartmentsWithPaginationAndSearch(
            @RequestParam(name = "locationId", required = false) Long locationId,
            @RequestParam(name = "search", defaultValue = "") String search,
            @RequestParam(name = "offset", defaultValue = "0") int offset,
            @RequestParam(name = "pageSize", defaultValue = "10") int pageSize) {
        return departmentService.getAllDepartmentsWithPaginationAndSearch(locationId, search, offset, pageSize);
    }

    @DeleteMapping("/{id}")
    public Message deleteDepartmentById(@PathVariable Long id) {
        departmentService.deleteDepartmentById(id);
        return new Message(HttpStatus.NO_CONTENT.value(), String.format("Department with id %s successfully deleted", id));
    }

}
