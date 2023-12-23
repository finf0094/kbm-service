package kz.qbm.app.dto.quiz.room;

import lombok.Data;

@Data
public class EndQuizRequest {
    private Long userId;
    private String quizId;

}