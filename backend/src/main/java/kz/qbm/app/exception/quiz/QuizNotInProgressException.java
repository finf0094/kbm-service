package kz.qbm.app.exception.quiz;

public class QuizNotInProgressException extends RuntimeException {
    public QuizNotInProgressException(String message) {
        super(message);
    }
}