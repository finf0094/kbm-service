package kz.qbm.app.mapper.position;

import kz.qbm.app.dto.position.DepartmentSummaryDTO;
import kz.qbm.app.entity.position.Department;
import org.springframework.stereotype.Component;

@Component
public class DepartmentMapper {
    public DepartmentSummaryDTO convertToDepartmentSummaryDTO(Department department) {
        return DepartmentSummaryDTO.builder()
                .name(department.getName())
                .id(department.getId())
                .build();
    }
}
