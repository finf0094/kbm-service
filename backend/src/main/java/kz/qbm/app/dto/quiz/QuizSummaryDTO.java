package kz.qbm.app.dto.quiz;

import kz.qbm.app.entity.position.Position;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class QuizSummaryDTO {
    private String quizId;
    private String title;
    private String description;
    private Integer duration;
    private Position position;
}
