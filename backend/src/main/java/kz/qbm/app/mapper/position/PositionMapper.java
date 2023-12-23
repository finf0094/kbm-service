package kz.qbm.app.mapper.position;

import kz.qbm.app.dto.position.DepartmentSummaryDTO;
import kz.qbm.app.dto.position.PositionSummaryDTO;
import kz.qbm.app.entity.position.Department;
import kz.qbm.app.entity.position.Position;
import org.springframework.stereotype.Component;

@Component
public class PositionMapper {
    public PositionSummaryDTO convertToPositionSummaryDTO(Position position) {
        return PositionSummaryDTO.builder()
                .name(position.getName())
                .id(position.getId())
                .build();
    }
}
