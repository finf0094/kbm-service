package kz.qbm.app.specification.position;

import kz.qbm.app.entity.position.Location;
import org.springframework.data.jpa.domain.Specification;

public class LocationSpecification {

    public static Specification<Location> search(String search) {
        return (root, query, cb) -> cb.like(root.get("name"), "%" + search + "%");
    }
}
