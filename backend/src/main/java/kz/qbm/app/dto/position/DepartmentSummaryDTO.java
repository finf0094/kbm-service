package kz.qbm.app.dto.position;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class DepartmentSummaryDTO {
    private Long id;
    private String name;
}
