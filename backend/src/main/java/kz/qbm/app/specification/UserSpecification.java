package kz.qbm.app.specification;

import jakarta.persistence.criteria.Join;
import kz.qbm.app.entity.Role;
import kz.qbm.app.entity.User;
import kz.qbm.app.entity.application.Application;
import kz.qbm.app.entity.application.ApplicationStatus;
import kz.qbm.app.entity.position.Position;
import org.springframework.data.jpa.domain.Specification;

public class UserSpecification {

    public static Specification<User> hasRole(String roleName) {
        if (roleName == null || roleName.isEmpty()) {
            return null;
        }

        return (root, cq, cb) -> {
            Join<User, Role> roleJoin = root.join("roles");

            return cb.equal(roleJoin.get("name"), roleName);
        };
    }

    public static Specification<User> search(String search) {
        return (root, query, cb) -> {
            Join<User, Position> position = root.join("position");

            return cb.or(
                    cb.like(root.get("itin"), "%" + search + "%"),
                    cb.like(root.get("firstname"), "%" + search + "%"),
                    cb.like(root.get("lastname"), "%" + search + "%"),
                    cb.like(root.get("phoneNumber"), "%" + search + "%"),
                    cb.like(root.get("email"), "%" + search + "%"),
                    cb.like(position.get("name"), "%" + search + "%")
            );
        };
    }

}