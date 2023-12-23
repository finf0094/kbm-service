package kz.qbm.app.dto.quiz.room;

import lombok.Data;

@Data
public class StartQuizRequest {
    private Long userId;
    private String quizId;
}