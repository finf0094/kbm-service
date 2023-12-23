package kz.qbm.app.repository.quiz;

import kz.qbm.app.entity.position.Position;
import kz.qbm.app.entity.quiz.Quiz;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface QuizRepository extends JpaRepository<Quiz, String> {
    Page<Quiz> findAll(Pageable pageable);

    Optional<Quiz> findQuizByPosition(Position position);
}
