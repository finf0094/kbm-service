package kz.qbm.app.service.quiz;

import kz.qbm.app.dto.Message;
import kz.qbm.app.entity.position.Position;
import kz.qbm.app.exception.RequestExistException;
import kz.qbm.app.repository.quiz.QuizRepository;
import kz.qbm.app.dto.quiz.QuizSummaryDTO;
import kz.qbm.app.entity.quiz.Quiz;
import kz.qbm.app.exception.NotFoundException;
import kz.qbm.app.mapper.quiz.QuizMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuizService {
    // REPOSITORIES
    private final QuizRepository quizRepository;

    // MAPPERS
    private final QuizMapper quizMapper;

    public Quiz createOrUpdateQuiz(Quiz quiz) {
        if (quiz.getQuizId() == null || quiz.getQuizId().isEmpty()) {
            // Create a new quiz if no ID is provided
            return createQuiz(quiz);
        } else {
            // Update an existing quiz if an ID is provided
            return updateQuiz(quiz);
        }
    }

    public Page<QuizSummaryDTO> getAllQuizWithPagination(int offset, int pageSize) {
        Page<Quiz> quizzes = quizRepository.findAll(PageRequest.of(offset, pageSize));

        return quizzes.map(quizMapper::convertToQuizSummaryDTO);
    }

    public Quiz getQuizById(String quizId) {
        Optional<Quiz> quizOptional = quizRepository.findById(quizId);
        return quizOptional.orElseThrow(
                () -> new NotFoundException(String.format("Quiz with id '%s' not found", quizId))
        );
    }

    public Message deleteQuizById(String quizId) {
        Quiz quiz = getQuizById(quizId);
        quizRepository.delete(quiz);

        return new Message(HttpStatus.OK.value(), String.format("Quiz with id: %s deleted successfully", quizId));
    }

    public Quiz getQuizByPosition(Position position) {
        String positionName = position.getName();
        return quizRepository.findQuizByPosition(position).orElseThrow(
                () -> new NotFoundException(String.format("Quiz for position %s not found.", positionName))
        );
    }


    // PRIVATE METHODS
    private Quiz createQuiz(Quiz newQuiz) {
        try {
            Quiz quiz = Quiz.builder()
                    .title(newQuiz.getTitle())
                    .description(newQuiz.getDescription())
                    .duration(newQuiz.getDuration())
                    .questions(newQuiz.getQuestions())
                    .openQuestions(newQuiz.getOpenQuestions())
                    .position(newQuiz.getPosition())
                    .build();

            return quizRepository.save(quiz);
        } catch (DataIntegrityViolationException e) {
            throw new RequestExistException("Duplicate key value violates unique constraint.");
        }
    }

    private Quiz updateQuiz(Quiz quiz) {
        try {
            Quiz existingQuiz = quizRepository.findById(quiz.getQuizId()).orElseThrow(
                    () -> new NotFoundException(String.format("Quiz with id '%s' not found", quiz.getQuizId()))
            );

            existingQuiz.setTitle(quiz.getTitle());
            existingQuiz.setDescription(quiz.getDescription());
            existingQuiz.setDuration(quiz.getDuration());
            existingQuiz.setQuestions(quiz.getQuestions());
            existingQuiz.setOpenQuestions(quiz.getOpenQuestions());
            existingQuiz.setPosition(quiz.getPosition());

            return quizRepository.save(existingQuiz);
        } catch (DataIntegrityViolationException e) {
            throw new RequestExistException("Duplicate key value violates unique constraint.");
        }
    }
}
