package kz.qbm.app.exception.quiz;

public class QuizAlreadyCompletedException extends RuntimeException{
    public QuizAlreadyCompletedException(String message) {
        super(message);
    }
}
