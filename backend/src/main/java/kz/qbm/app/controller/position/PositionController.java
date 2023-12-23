package kz.qbm.app.controller.position;

import kz.qbm.app.dto.position.CreatePositionRequestDTO;
import kz.qbm.app.entity.position.Position;
import kz.qbm.app.exception.NotFoundException;
import kz.qbm.app.service.position.PositionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/positions")
@RequiredArgsConstructor
public class PositionController {
    private final PositionService positionService;

    @PostMapping
    public Position createPosition(@RequestBody CreatePositionRequestDTO createPositionRequestDto)
    {
        Position position = positionService.createPosition(
                createPositionRequestDto.getName(),
                createPositionRequestDto.getDepartmentId());

        return position;
    }

    @GetMapping("/getPosition")
    public Position getPositionById(
            @RequestParam(name = "id") Long positionId) {
        return positionService.getPositionById(positionId).orElseThrow(
                () -> new NotFoundException(String.format("Position with id: %s does not exist", positionId))
        );
    }

    @GetMapping
    public List<Position> getAllPositions(
            @RequestParam("departmentId") Long departmentId) {
        if (departmentId != null) {
            return positionService.getPositionsByDepartmentId(departmentId);
        } else {
            return positionService.getAllPositions();
        }
    }

}
