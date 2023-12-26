package kz.qbm.app.service.quiz.room;
import jakarta.transaction.Transactional;
import kz.qbm.app.dto.quiz.room.EndQuizRequest;
import kz.qbm.app.dto.quiz.room.QuizSessionDTO;
import kz.qbm.app.dto.quiz.room.SubmitAnswerRequest;
import kz.qbm.app.dto.quiz.room.SubmitOpenAnswerRequest;
import kz.qbm.app.entity.User;
import kz.qbm.app.entity.application.Application;
import kz.qbm.app.entity.application.ApplicationStatus;
import kz.qbm.app.entity.quiz.Quiz;
import kz.qbm.app.entity.quiz.openQuestion.OpenQuestion;
import kz.qbm.app.entity.quiz.question.Answer;
import kz.qbm.app.entity.quiz.question.Question;
import kz.qbm.app.entity.quiz.room.QuizSession;
import kz.qbm.app.entity.quiz.room.QuizSessionStatus;
import kz.qbm.app.exception.NotFoundException;
import kz.qbm.app.exception.quiz.QuizAlreadyCompletedException;
import kz.qbm.app.exception.quiz.QuizNotInProgressException;
import kz.qbm.app.mapper.quiz.room.QuizSessionMapper;
import kz.qbm.app.repository.UserRepository;
import kz.qbm.app.repository.application.ApplicationRepository;
import kz.qbm.app.repository.quiz.QuizRepository;
import kz.qbm.app.repository.quiz.openQuestion.OpenQuestionRepository;
import kz.qbm.app.repository.quiz.question.AnswerRepository;
import kz.qbm.app.repository.quiz.question.QuestionRepository;
import kz.qbm.app.repository.quiz.room.QuizSessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class QuizSessionService {
    // REPOSITORIES
    private final UserRepository userRepository;
    private final QuizRepository quizRepository;
    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;
    private final QuizSessionRepository quizSessionRepository;
    private final ApplicationRepository applicationRepository;
    private final OpenQuestionRepository openQuestionRepository;

    // MAPPERS
    private final QuizSessionMapper quizSessionMapper;

    public QuizSession createSession(Long userId, String quizId) {
        User user = getUser(userId);
        Quiz quiz = getQuiz(quizId);

        QuizSession quizSession = new QuizSession();
        quizSession.setUser(user);
        quizSession.setQuiz(quiz);
        quizSession.setStatus(QuizSessionStatus.NOT_STARTED);
        quizSession.setScore(0);

        return quizSessionRepository.save(quizSession);
    }

    public QuizSession startQuiz(String quizSessionId) {
        QuizSession quizSession = getQuizSessionById(quizSessionId);

        // преобразования продолжительности викторины из типа Integer минут в миллисекунды Date
        long durationMillis = TimeUnit.MINUTES.toMillis(quizSession.getQuiz().getDuration());
        Date endTime = new Date(System.currentTimeMillis() + durationMillis);

        quizSession.setEndTime(endTime);
        quizSession.setStartTime(new Date());
        quizSession.setStatus(QuizSessionStatus.IN_PROGRESS);

        quizSession = quizSessionRepository.save(quizSession);
        return quizSession;
    }

    @Transactional
    public QuizSession submitAnswer(SubmitAnswerRequest request) {
        QuizSession quizSession = getQuizSession(request.getUserId(), request.getQuizId());
        checkQuizInProgress(quizSession);

        if (isTimeExpired(quizSession)) {
            quizSession.setStatus(QuizSessionStatus.TIME_EXPIRED);
        } else {
            updateScoreAndCalculatePercentage(quizSession, request.getQuestionId(), request.getAnswerId());
        }

        quizSession = quizSessionRepository.save(quizSession);
        return quizSession;
    }

    @Transactional
    public QuizSession submitOpenAnswer(SubmitOpenAnswerRequest request) {
        QuizSession quizSession = getQuizSession(request.getUserId(), request.getQuizId());
        checkQuizInProgress(quizSession);

        if (isTimeExpired(quizSession)) {
            quizSession.setStatus(QuizSessionStatus.TIME_EXPIRED);
        } else {
            OpenQuestion openQuestion = openQuestionRepository.findById(request.getOpenQuestionId()).orElseThrow(
                    () -> new NotFoundException(String.format("Open question with id %s does not exist", request.getOpenQuestionId()))
            );

            quizSession.getOpenQuestionAnswers().put(openQuestion.getName(), request.getOpenQuestionText());
        }

        quizSession = quizSessionRepository.save(quizSession);
        return quizSession;
    }

    @Transactional
    public QuizSession endQuiz(EndQuizRequest request) {
        QuizSession quizSession = getQuizSession(request.getUserId(), request.getQuizId());
        checkQuizInProgress(quizSession);

        if (isTimeExpired(quizSession)) {
            quizSession.setStatus(QuizSessionStatus.TIME_EXPIRED);
        } else {
            quizSession.setEndTime(new Date());
            quizSession.setStatus(QuizSessionStatus.COMPLETED);
        }

        quizSession = quizSessionRepository.save(quizSession);

        // Check if this is the last quiz session
        checkAndUpdateApplicationStatus(request.getUserId());

        return quizSession;
    }

    public QuizSession getQuizSessionById(String quizSessionId) {
        return quizSessionRepository.findById(quizSessionId).orElseThrow(
                () -> new NotFoundException(String.format("QuizSession with id %s not found", quizSessionId))
        );
    }

    public List<QuizSession> getAllQuizSessionByUserId(Long userId) {
        return quizSessionRepository.findAllByUserId(userId).orElseThrow(
                () -> new NotFoundException(String.format("User with id %s doesnt have quizSession", userId))
        );
    }

    // PRIVATE METHODS
    private User getUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(
                () -> new NotFoundException(String.format("User with id %s not found", userId))
        );
    }

    private Quiz getQuiz(String quizId) {
        return quizRepository.findById(quizId).orElseThrow(
                () -> new NotFoundException(String.format("Quiz with id %s not found", quizId))
        );
    }

    private QuizSession getQuizSession(Long userId, String quizId) {
        User user = getUser(userId);
        Quiz quiz = getQuiz(quizId);
        return quizSessionRepository.findByUserAndQuiz(user, quiz).orElseThrow(
                () -> new NotFoundException("Quiz session does not exist")
        );
    }

    private Question getQuestion(String questionId) {
        return questionRepository.findById(questionId).orElseThrow(
                () -> new NotFoundException(String.format("Question with id %s not found", questionId))
        );
    }

    private Answer getAnswer(String answerId) {
        return answerRepository.findById(answerId).orElseThrow(
                () -> new NotFoundException(String.format("Answer with id %s not found", answerId))
        );
    }

    private void checkQuizInProgress(QuizSession quizSession) {
        if (quizSession.getStatus() != QuizSessionStatus.IN_PROGRESS) {
            throw new QuizNotInProgressException("Quiz is not in progress");
        }
        if (quizSession.getStatus() == QuizSessionStatus.COMPLETED) {
            throw new QuizAlreadyCompletedException("Quiz is already completed");
        }
    }

    private boolean isTimeExpired(QuizSession quizSession) {
        return new Date().after(quizSession.getEndTime());
    }

    private void checkAndUpdateApplicationStatus(Long userId) {
        // Check if this is the last quiz session
        List<QuizSession> allQuizSessions = getAllQuizSessionByUserId(userId);
        if (allQuizSessions.stream().allMatch(session -> session.getStatus() == QuizSessionStatus.COMPLETED)) {
            // If this is the last quiz session, update the application status to PENDING
            Application application = applicationRepository.findByUserId(userId).orElseThrow(
                    () -> new NotFoundException(String.format("Application for user with id: %s does not exist", userId))
            );
            application.setStatus(ApplicationStatus.PENDING);
            applicationRepository.save(application);
        }
    }

    private void updateScoreAndCalculatePercentage(QuizSession quizSession, String questionId, String answerId) {
        updateScore(quizSession, questionId, answerId);

        // Calculate percentage
        int maxScore = quizSession.getQuiz().getQuestions().size() * 3; // Assuming each question has a max score of 30
        double percentage = calculatePercentage(quizSession.getScore(), maxScore);
        quizSession.setScorePercentage(percentage);
    }

    private void updateScore(QuizSession quizSession, String questionId, String answerId) {
        String previousAnswerId = quizSession.getSelectedAnswers().get(questionId);
        if (previousAnswerId != null) {
            Answer previousAnswer = getAnswer(previousAnswerId);
            quizSession.setScore(quizSession.getScore() - previousAnswer.getAnswerWeight());
        }

        quizSession.getSelectedAnswers().put(questionId, answerId);
        Answer answer = getAnswer(answerId);
        quizSession.setScore(quizSession.getScore() + answer.getAnswerWeight());
    }

    private double calculatePercentage(int totalScore, int maxScore) {
        return (double) totalScore / maxScore * 100;
    }
}