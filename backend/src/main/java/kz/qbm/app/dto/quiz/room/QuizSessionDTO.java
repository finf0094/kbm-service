package kz.qbm.app.dto.quiz.room;

import kz.qbm.app.entity.quiz.room.QuizSessionStatus;
import lombok.Data;

import java.util.Date;

@Data
public class QuizSessionDTO {
    private String id;
    private Long userId;
    private String quizId;
    private Date startTime;
    private Date endTime;
    private QuizSessionStatus status;
    private int score;

}