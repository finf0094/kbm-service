package kz.qbm.app.specification.position;

import kz.qbm.app.entity.position.Department;
import kz.qbm.app.entity.position.Position;
import org.springframework.data.jpa.domain.Specification;

public class PositionSpecification {
    public static Specification<Position> search(String search) {
        return (root, query, cb) -> cb.like(root.get("name"), "%" + search + "%");
    }

    public static Specification<Position> hasDepartment(Long departmentId) {
        return (root, query, cb) -> cb.equal(root.get("department").get("id"), departmentId);
    }

}
