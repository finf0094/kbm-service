package kz.qbm.app.service.position;

import kz.qbm.app.entity.position.Department;
import kz.qbm.app.entity.position.Position;
import kz.qbm.app.exception.NotFoundException;
import kz.qbm.app.repository.position.PositionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PositionService {
    private final PositionRepository positionRepository;
    private final DepartmentService departmentService;

    public Optional<Position> getPositionById(Long positionId) {
        return positionRepository.findById(positionId);
    }

    public List<Position> getAllPositions() {
        return positionRepository.findAll();
    }

    public List<Position> getPositionsByDepartmentId(Long departmentId) {
        return positionRepository.findAllByDepartment_Id(departmentId).orElseThrow(
                () -> new NotFoundException("Positions does not exist")
        );
    }

    public Position createPosition(String positionName, Long departmentId) {
        Department department = departmentService.getDepartmentById(departmentId).orElseThrow(
                () -> new NotFoundException("Location does not exist!")
        );

        Position position = new Position();
        position.setName(positionName);
        position.setDepartment(department);

        return positionRepository.save(position);
    }
}
