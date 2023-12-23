package kz.qbm.app.service.position;

import kz.qbm.app.dto.position.DepartmentSummaryDTO;
import kz.qbm.app.entity.position.Department;
import kz.qbm.app.entity.position.Location;
import kz.qbm.app.exception.NotFoundException;
import kz.qbm.app.repository.position.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DepartmentService {
    private final DepartmentRepository departmentRepository;
    private final LocationService locationService;

    public Optional<Department> getDepartmentById(Long departmentId) {
        return departmentRepository.findById(departmentId);
    }

    public List<DepartmentSummaryDTO> getAllDepartments()
    {
        return departmentRepository.findAllDepartmentSummaries();
    }

    public Optional<List<DepartmentSummaryDTO>> getDepartmentsByLocationId(Long locationId) {
        return departmentRepository.findAllByLocationId(locationId);
    }

    public Department createDepartment(String departmentName, Long locationId) {
        Location location = locationService.getLocationById(locationId).orElseThrow(
                () -> new NotFoundException("Location does not exist!")
        );

        Department department = new Department();
        department.setName(departmentName);
        department.setLocation(location);

        return departmentRepository.save(department);
    }
}
