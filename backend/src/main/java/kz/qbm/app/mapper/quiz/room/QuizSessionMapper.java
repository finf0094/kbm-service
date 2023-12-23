package kz.qbm.app.mapper.quiz.room;

import kz.qbm.app.dto.quiz.room.QuizSessionDTO;
import kz.qbm.app.entity.quiz.room.QuizSession;
import org.springframework.stereotype.Component;

@Component
public class QuizSessionMapper {
    public QuizSessionDTO convertToDTO(QuizSession quizSession) {
        QuizSessionDTO dto = new QuizSessionDTO();
        dto.setId(quizSession.getSessionId());
        dto.setUserId(quizSession.getUser().getId());
        dto.setQuizId(quizSession.getQuiz().getQuizId());
        dto.setStartTime(quizSession.getStartTime());
        dto.setEndTime(quizSession.getEndTime());
        dto.setStatus(quizSession.getStatus());
        dto.setScore(quizSession.getScore());
        return dto;
    }
}
