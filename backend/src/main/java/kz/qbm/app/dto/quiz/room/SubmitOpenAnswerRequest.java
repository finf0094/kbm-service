package kz.qbm.app.dto.quiz.room;


import lombok.Data;

@Data
public class SubmitOpenAnswerRequest {
    private Long userId;
    private String quizId;
    private String openQuestionId;
    private String openQuestionText;
}
