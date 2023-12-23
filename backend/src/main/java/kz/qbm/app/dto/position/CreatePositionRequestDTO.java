package kz.qbm.app.dto.position;

import lombok.Data;

@Data
public class CreatePositionRequestDTO {
    private String name;
    private Long departmentId;
}
