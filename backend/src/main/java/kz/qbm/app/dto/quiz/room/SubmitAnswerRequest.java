package kz.qbm.app.dto.quiz.room;

import lombok.Data;

@Data
public class SubmitAnswerRequest {
    private Long userId;
    private String quizId;
    private String questionId;
    private String answerId;

}