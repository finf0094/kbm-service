package kz.qbm.app.controller;

import io.jsonwebtoken.ExpiredJwtException;
import kz.qbm.app.dto.exception.ErrorDTO;
import kz.qbm.app.exception.*;
import kz.qbm.app.exception.quiz.QuizAlreadyCompletedException;
import kz.qbm.app.exception.quiz.QuizNotInProgressException;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


@ControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class GlobalExceptionHandler {

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ErrorDTO> handleAuthenticationException(AuthenticationException ex) {
        ErrorDTO errorDTO = new ErrorDTO(ex.getHttpStatus().value(), ex.getMessage());

        return ResponseEntity.status(ex.getHttpStatus().value())
                .body(errorDTO);
    }

    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<ErrorDTO> handleExpiredJwtException(ExpiredJwtException ex) {
        ErrorDTO errorDTO = new ErrorDTO(HttpStatus.UNAUTHORIZED.value(), "Token has expired");

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(errorDTO);
    }

    @ExceptionHandler(RequestExistException.class)
    public ResponseEntity<ErrorDTO> handleRequestExistException(RequestExistException ex) {
        ErrorDTO errorDTO = new ErrorDTO(HttpStatus.CONFLICT.value(), ex.getMessage());

        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(errorDTO);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorDTO> handleNotFoundException(NotFoundException ex) {
        ErrorDTO errorDTO = new ErrorDTO(HttpStatus.NOT_FOUND.value(), ex.getMessage());

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(errorDTO);
    }

    @ExceptionHandler(UnknownParameterException.class)
    public ResponseEntity<ErrorDTO> handleUnknownParameterException(UnknownParameterException ex) {
        ErrorDTO errorDTO = new ErrorDTO(HttpStatus.PRECONDITION_FAILED.value(), ex.getMessage());

        return ResponseEntity.status(HttpStatus.PRECONDITION_FAILED)
                .body(errorDTO);
    }

    @ExceptionHandler(QuizNotInProgressException.class)
    public ResponseEntity<ErrorDTO> handleQuizNotInProgressException(QuizNotInProgressException ex) {
        ErrorDTO errorDTO = new ErrorDTO(HttpStatus.BAD_REQUEST.value(), ex.getMessage());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(errorDTO);
    }

    @ExceptionHandler(QuizAlreadyCompletedException.class)
    public ResponseEntity<ErrorDTO> handleQuizAlreadyCompletedException(QuizAlreadyCompletedException ex) {
        ErrorDTO errorDTO = new ErrorDTO(HttpStatus.BAD_REQUEST.value(), ex.getMessage());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(errorDTO);
    }
    @ExceptionHandler(InvalidVideoFileException.class)
    public ResponseEntity<ErrorDTO> handleInvalidVideoFileException(InvalidVideoFileException ex) {
        ErrorDTO errorDTO = new ErrorDTO(HttpStatus.BAD_REQUEST.value(), ex.getMessage());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(errorDTO);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ErrorDTO> handleBadRequestException(BadRequestException ex) {
        ErrorDTO errorDTO = new ErrorDTO(HttpStatus.BAD_REQUEST.value(), ex.getMessage());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(errorDTO);
    }

    @ExceptionHandler(StorageException.class)
    public ResponseEntity<ErrorDTO> handleStorageException(StorageException ex) {
        ErrorDTO errorDTO = new ErrorDTO(HttpStatus.BAD_REQUEST.value(), ex.getMessage());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(errorDTO);
    }
}
