package kz.qbm.app.dto.position;

import lombok.Data;

@Data
public class CreateDepartmentRequestDTO {
    private String name;
    private Long locationId;
}
