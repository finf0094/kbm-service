package kz.qbm.app.service;


import kz.qbm.app.dto.CuratorDTO;
import kz.qbm.app.entity.Curator;
import kz.qbm.app.repository.CuratorRepository;
import kz.qbm.app.specification.CuratorSpecification;
import kz.qbm.app.utils.NullAwareBeanUtilsBean;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CuratorService {

    // REPOSITORY
    private final CuratorRepository curatorRepository;

    // UTILS
    private final NullAwareBeanUtilsBean nullAwareBeanUtilsBean;

    public Curator createCurator(CuratorDTO curatorDTO) {
        Curator curator = new Curator();
        // Копирование свойств из DTO в сущность
        copyProperties(curatorDTO, curator);
        return curatorRepository.save(curator);
    }

    public Curator updateCurator(Long id, CuratorDTO curatorDTO) {
        Curator curator = curatorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Curator not found"));
        // Копирование свойств, игнорируя null
        copyProperties(curatorDTO, curator);
        return curatorRepository.save(curator);
    }

    public Curator getCurator(Long id) {
        return curatorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Curator not found"));
    }

    public Page<Curator> getAllCurators(String search, Pageable pageable) {
        Specification<Curator> spec = Specification.where(CuratorSpecification.search(search));
        return curatorRepository.findAll(spec, pageable);
    }

    public void deleteCurator(Long id) {
        curatorRepository.deleteById(id);
    }


    // PRIVATE METHODS
    private void copyProperties(CuratorDTO source, Curator destination) {
        try {
            nullAwareBeanUtilsBean.copyProperties(destination, source);
        } catch (IllegalAccessException | InvocationTargetException e) {
            throw new RuntimeException("Error during properties copying", e);
        }
    }
}