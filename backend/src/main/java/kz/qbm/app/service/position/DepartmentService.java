package kz.qbm.app.service.position;

import kz.qbm.app.dto.position.DepartmentSummaryDTO;
import kz.qbm.app.entity.position.Department;
import kz.qbm.app.entity.position.Location;
import kz.qbm.app.exception.BadRequestException;
import kz.qbm.app.exception.NotFoundException;
import kz.qbm.app.mapper.position.DepartmentMapper;
import kz.qbm.app.repository.position.DepartmentRepository;
import kz.qbm.app.specification.position.DepartmentSpecification;
import kz.qbm.app.specification.position.LocationSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DepartmentService {

    // REPOSITORIES
    private final DepartmentRepository departmentRepository;

    // SERVICES
    private final LocationService locationService;

    // MAPPERS
    private final DepartmentMapper departmentMapper;

    public Department createDepartment(String departmentName, Long locationId) {
        Location location = locationService.getLocationById(locationId).orElseThrow(
                () -> new NotFoundException("Location does not exist!")
        );

        Department department = new Department();
        department.setName(departmentName);
        department.setLocation(location);

        return departmentRepository.save(department);
    }

    public Department updateDepartment(Long departmentId, String newName) {
        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new RuntimeException("Department not found with id: " + departmentId));

        department.setName(newName);
        return departmentRepository.save(department);
    }

    public Page<DepartmentSummaryDTO> getAllDepartmentsWithPaginationAndSearch(Long locationId, String search, int offset, int pageSize) {
        Specification<Department> spec = DepartmentSpecification.search(search);

        if (locationId != null) spec = spec.and(DepartmentSpecification.hasLocation(locationId));

        Page<Department> departments = departmentRepository.findAll(spec, PageRequest.of(offset, pageSize));

        return departments.map(departmentMapper::convertToDepartmentSummaryDTO);
    }

    public Optional<Department> getDepartmentById(Long departmentId) {
        return departmentRepository.findById(departmentId);
    }

    public void deleteDepartmentById(Long departmentId) {
        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new RuntimeException("Department not found with id: " + departmentId));

        if (!department.getPositions().isEmpty()) {
            throw new BadRequestException("Cannot delete department with existing positions. Please delete all positions associated with this department first.");
        }

        departmentRepository.deleteById(departmentId);
    }

}
