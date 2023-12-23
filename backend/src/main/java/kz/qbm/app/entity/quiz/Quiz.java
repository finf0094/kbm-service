package kz.qbm.app.entity.quiz;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Table;
import kz.qbm.app.entity.position.Position;
import kz.qbm.app.entity.quiz.openQuestion.OpenQuestion;
import kz.qbm.app.entity.quiz.question.Question;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.*;

import java.time.Duration;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "quizzes")
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "quiz_id", updatable = false, nullable = false, columnDefinition = "VARCHAR(36)")
    private String quizId;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String description;
    private Integer duration;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "position_id")
    private Position position;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "quiz_id")
    private List<Question> questions;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "quiz_id")
    private List<OpenQuestion> openQuestions;


    @CreationTimestamp
    @Column(updatable = false, name = "created_at")
    private Date createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Date updatedAt;

}
