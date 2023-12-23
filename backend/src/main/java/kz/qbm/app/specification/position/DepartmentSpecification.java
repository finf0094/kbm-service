package kz.qbm.app.specification.position;

import kz.qbm.app.entity.position.Department;
import org.springframework.data.jpa.domain.Specification;

public class DepartmentSpecification {
    public static Specification<Department> search(String search) {
        return (root, query, cb) -> cb.like(root.get("name"), "%" + search + "%");
    }

    public static Specification<Department> hasLocation(Long locationId) {
        return (root, query, cb) -> cb.equal(root.get("location").get("id"), locationId);
    }

}
