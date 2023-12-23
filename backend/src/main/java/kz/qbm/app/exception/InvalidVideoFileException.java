package kz.qbm.app.exception;

public class InvalidVideoFileException extends RuntimeException {
    public InvalidVideoFileException(String message) {
        super(message);
    }
}