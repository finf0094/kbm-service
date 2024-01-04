package kz.qbm.app.specification;

import kz.qbm.app.entity.Curator;
import org.springframework.data.jpa.domain.Specification;

public class CuratorSpecification {

    public static Specification<Curator> search(String search) {
        return (root, query, cb) -> cb.or(
                cb.like(root.get("fullName"), "%" + search + "%"),
                cb.like(root.get("itin"), "%" + search + "%"),
                cb.like(root.get("curatorNumber"), "%" + search + "%"),
                cb.like(root.get("workPhoneNumber"), "%" + search + "%"),
                cb.like(root.get("personalPhoneNumber"), "%" + search + "%"),
                cb.like(root.get("email"), "%" + search + "%"),
                cb.like(root.get("education"), "%" + search + "%"),
                cb.like(root.get("certificateNumber"), "%" + search + "%"),
                cb.like(root.get("academicDegree"), "%" + search + "%"),
                cb.like(root.get("academicTitle"), "%" + search + "%")
        );
    }
}
