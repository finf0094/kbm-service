package kz.qbm.app.repository.quiz.openQuestion;

import kz.qbm.app.entity.quiz.openQuestion.OpenQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OpenQuestionRepository extends JpaRepository<OpenQuestion, String> {
}
