package kz.qbm.app.exception;

import org.springframework.http.HttpStatus;

public class AuthenticationException extends RuntimeException{
    private final HttpStatus httpStatus;
    public AuthenticationException(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;

    }
    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
