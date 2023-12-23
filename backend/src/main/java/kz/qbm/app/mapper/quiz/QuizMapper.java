package kz.qbm.app.mapper.quiz;


import kz.qbm.app.dto.quiz.QuizSummaryDTO;
import kz.qbm.app.entity.quiz.Quiz;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class QuizMapper {
    public QuizSummaryDTO convertToQuizSummaryDTO(Quiz quiz) {
        return QuizSummaryDTO.builder()
                .quizId(quiz.getQuizId())
                .title(quiz.getTitle())
                .description(quiz.getDescription())
                .duration(quiz.getDuration())
                .position(quiz.getPosition())
                .build();
    }
}
