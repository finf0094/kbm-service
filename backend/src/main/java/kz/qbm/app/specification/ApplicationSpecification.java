package kz.qbm.app.specification;

import jakarta.persistence.criteria.Join;
import kz.qbm.app.entity.User;
import kz.qbm.app.entity.application.Application;
import kz.qbm.app.entity.application.ApplicationStatus;
import kz.qbm.app.entity.position.Position;
import org.springframework.data.jpa.domain.Specification;

public class ApplicationSpecification {

    public static Specification<Application> hasStatus(ApplicationStatus status) {
        return (application, cq, cb) -> cb.equal(application.get("status"), status);
    }

    public static Specification<Application> search(String search) {
        return (root, query, cb) -> {
            Join<Application, User> userJoin = root.join("user");
            Join<Application, Position> positionJoin = root.join("desiredPositions");

            return cb.or(
                    cb.like(userJoin.get("itin"), "%" + search + "%"),
                    cb.like(userJoin.get("firstname"), "%" + search + "%"),
                    cb.like(userJoin.get("lastname"), "%" + search + "%"),
                    cb.like(userJoin.get("phoneNumber"), "%" + search + "%"),
                    cb.like(userJoin.get("email"), "%" + search + "%"),
                    cb.like(positionJoin.get("name"), "%" + search + "%")
            );
        };
    }


}