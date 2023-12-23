package kz.qbm.app.entity.quiz.openQuestion;

import jakarta.persistence.*;
import kz.qbm.app.entity.quiz.Quiz;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "open_questions")
public class OpenQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(nullable = false, updatable = false, unique = true)
    private String id;

    @Column(nullable = false)
    private String name;

}
