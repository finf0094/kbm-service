package kz.qbm.app.specification;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import kz.qbm.app.entity.Role;
import kz.qbm.app.entity.User;
import kz.qbm.app.entity.position.Position;
import org.springframework.data.jpa.domain.Specification;

public class UserSpecification {

    public static Specification<User> hasRole(String roleName) {
        return (root, cq, cb) -> {
            Join<User, Role> roleJoin = root.join("roles");

            return cb.equal(roleJoin.get("name"), roleName);
        };
    }

    public static Specification<User> search(String search) {
        return (root, query, cb) -> {
            Join<User, Position> position = root.join("position", JoinType.LEFT);

            Predicate itinPredicate = cb.like(root.get("itin"), "%" + search + "%");
            Predicate firstnamePredicate = cb.like(root.get("firstname"), "%" + search + "%");
            Predicate lastnamePredicate = cb.like(root.get("lastname"), "%" + search + "%");
            Predicate phoneNumberPredicate = cb.like(root.get("phoneNumber"), "%" + search + "%");
            Predicate emailPredicate = cb.like(root.get("email"), "%" + search + "%");
            Predicate positionNamePredicate = cb.like(position.get("name"), "%" + search + "%");

            return cb.and(itinPredicate, firstnamePredicate, lastnamePredicate, phoneNumberPredicate, emailPredicate, positionNamePredicate);
        };
    }

}