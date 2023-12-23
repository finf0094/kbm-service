package kz.qbm.app.service.position;

import kz.qbm.app.dto.position.PositionSummaryDTO;
import kz.qbm.app.entity.position.Department;
import kz.qbm.app.entity.position.Position;
import kz.qbm.app.exception.BadRequestException;
import kz.qbm.app.exception.NotFoundException;
import kz.qbm.app.mapper.position.PositionMapper;
import kz.qbm.app.repository.position.PositionRepository;
import kz.qbm.app.specification.position.PositionSpecification;
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
public class PositionService {
    // REPOSITORIES
    private final PositionRepository positionRepository;

    // SERVICES
    private final DepartmentService departmentService;

    // MAPPERS
    private final PositionMapper positionMapper;

    public Position createPosition(String positionName, Long departmentId) {
        Department department = departmentService.getDepartmentById(departmentId).orElseThrow(
                () -> new NotFoundException("Location does not exist!")
        );

        Position position = new Position();
        position.setName(positionName);
        position.setDepartment(department);

        return positionRepository.save(position);
    }

    public Position updatePosition(Long positionId, String newName) {
        Position position = positionRepository.findById(positionId)
                .orElseThrow(() -> new RuntimeException("Position not found with id: " + positionId));

        position.setName(newName);
        return positionRepository.save(position);
    }

    public Optional<Position> getPositionById(Long positionId) {
        return positionRepository.findById(positionId);
    }

    public Page<PositionSummaryDTO> getAllPositionsWithPaginationAndSearch(Long departmentId, String search, int offset, int pageSize) {
        Specification<Position> spec = PositionSpecification.search(search);

        if (departmentId != null) {
            spec = spec.and(PositionSpecification.hasDepartment(departmentId));
        }

        Page<Position> positions = positionRepository.findAll(spec, PageRequest.of(offset, pageSize));

        return positions.map(positionMapper::convertToPositionSummaryDTO);
    }

    public void deletePositionById(Long positionId) {
        Position position = positionRepository.findById(positionId)
                .orElseThrow(() -> new RuntimeException("Location not found with id: " + positionId));

        positionRepository.deleteById(positionId);
    }

}
