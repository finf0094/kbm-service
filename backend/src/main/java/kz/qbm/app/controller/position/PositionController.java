package kz.qbm.app.controller.position;

import kz.qbm.app.dto.Message;
import kz.qbm.app.dto.position.CreatePositionRequestDTO;
import kz.qbm.app.dto.position.DepartmentSummaryDTO;
import kz.qbm.app.dto.position.PositionSummaryDTO;
import kz.qbm.app.entity.position.Position;
import kz.qbm.app.exception.NotFoundException;
import kz.qbm.app.service.position.PositionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
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

    @PutMapping("/{id}")
    public Position updatePosition(@PathVariable Long id, @RequestBody String newName) {
        return positionService.updatePosition(id, newName);
    }

    @GetMapping("/getPosition")
    public Position getPositionById(
            @RequestParam(name = "id") Long positionId) {
        return positionService.getPositionById(positionId).orElseThrow(
                () -> new NotFoundException(String.format("Position with id: %s does not exist", positionId))
        );
    }

    @GetMapping
    public Page<PositionSummaryDTO> getAllPositionsWithPaginationAndSearch(
            @RequestParam(name = "positionId", required = false) Long positionId,
            @RequestParam(name = "search", defaultValue = "") String search,
            @RequestParam(name = "offset", defaultValue = "0") int offset,
            @RequestParam(name = "pageSize", defaultValue = "10") int pageSize) {
        return positionService.getAllPositionsWithPaginationAndSearch(positionId, search, offset, pageSize);
    }

    @DeleteMapping("/{id}")
    public Message deletePositionById(@PathVariable Long id) {
        positionService.deletePositionById(id);
        return new Message(HttpStatus.NO_CONTENT.value(), String.format("Position with id %s successfully deleted", id));
    }

}
