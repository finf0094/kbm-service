package kz.qbm.app.exception;

public class RequestExistException extends RuntimeException {
    public RequestExistException() {
    }

    public RequestExistException(String message) {
        super(message);
    }

    public RequestExistException(String message, Throwable cause) {
        super(message, cause);
    }
}
