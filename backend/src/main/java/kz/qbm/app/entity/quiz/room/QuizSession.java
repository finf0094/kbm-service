package kz.qbm.app.entity.quiz.room;

import jakarta.persistence.*;
import kz.qbm.app.entity.User;
import kz.qbm.app.entity.quiz.Quiz;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Duration;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "quiz_sessions")
public class QuizSession {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(nullable = false, updatable = false, unique = true)
    private String sessionId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "quiz_id", nullable = false)
    private Quiz quiz;

    @ElementCollection
    @CollectionTable(name = "quiz_session_answers", joinColumns = @JoinColumn(name = "session_id"))
    @MapKeyColumn(name = "question_id")
    @Column(name = "answer_id")
    private Map<String, String> selectedAnswers = new HashMap<>();

    private Date startTime;

    private Date endTime;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private QuizSessionStatus status;

    private int score;

    private double scorePercentage;
}