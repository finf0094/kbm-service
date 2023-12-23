package kz.qbm.app.repository.quiz.question;

import kz.qbm.app.entity.quiz.question.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends JpaRepository<Question, String> {
}
