package kz.qbm.app.controller;


import kz.qbm.app.dto.CuratorDTO;
import kz.qbm.app.entity.Curator;
import kz.qbm.app.service.CuratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/curators")
public class CuratorController {

    private final CuratorService curatorService;

    @Autowired
    public CuratorController(CuratorService curatorService) {
        this.curatorService = curatorService;
    }

    @PostMapping
    public ResponseEntity<Curator> createCurator(@RequestBody CuratorDTO curatorDTO) {
        Curator curator = curatorService.createCurator(curatorDTO);
        return ResponseEntity.ok(curator);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Curator> updateCurator(@PathVariable Long id, @RequestBody CuratorDTO curatorDTO) {
        Curator updatedCurator = curatorService.updateCurator(id, curatorDTO);
        return ResponseEntity.ok(updatedCurator);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Curator> getCurator(@PathVariable Long id) {
        Curator curator = curatorService.getCurator(id);
        return ResponseEntity.ok(curator);
    }

    @GetMapping
    public ResponseEntity<Page<Curator>> getAllCurators(
            @RequestParam(value = "search", defaultValue = "") String search,
            @RequestParam(name = "offset", defaultValue = "0") int offset,
            @RequestParam(name = "pageSize", defaultValue = "10") int pageSize) {
        Page<Curator> curators = curatorService.getAllCurators(search, offset, pageSize);
        return ResponseEntity.ok(curators);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCurator(@PathVariable Long id) {
        curatorService.deleteCurator(id);
        return ResponseEntity.ok().build();
    }
}