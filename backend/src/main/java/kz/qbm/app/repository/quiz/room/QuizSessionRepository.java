package kz.qbm.app.repository.quiz.room;

import kz.qbm.app.entity.User;
import kz.qbm.app.entity.quiz.Quiz;
import kz.qbm.app.entity.quiz.room.QuizSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuizSessionRepository extends JpaRepository<QuizSession, String> {
    Optional<QuizSession> findByUserAndQuiz(User user, Quiz quiz);
    Optional<List<QuizSession>> findAllByUserId(Long id);
}
