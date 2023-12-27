package kz.qbm.app.controller.quiz.room;

import kz.qbm.app.dto.quiz.room.EndQuizRequest;
import kz.qbm.app.dto.quiz.room.SubmitAnswerRequest;
import kz.qbm.app.dto.quiz.room.SubmitOpenAnswerRequest;
import kz.qbm.app.entity.quiz.room.QuizSession;
import kz.qbm.app.exception.UnknownParameterException;
import kz.qbm.app.service.quiz.room.QuizSessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quizSessions")
@RequiredArgsConstructor
public class QuizSessionController {
    // SERVICES
    private final QuizSessionService quizSessionService;

    @GetMapping("/getSession")
    public ResponseEntity<?> getSession(@RequestParam(required = true) String id) {
        if (id != null) {
            return ResponseEntity.ok(quizSessionService.getQuizSessionById(id));
        } else {
            throw new UnknownParameterException("Either 'id' parameter is required.");
        }
    }

    @GetMapping("/getSessions")
    public List<QuizSession> getSessions(@RequestParam(required = true) Long userId) {
        if (userId != null) {
            return quizSessionService.getAllQuizSessionByUserId(userId);
        } else {
            throw new UnknownParameterException("Either 'userId' parameter is required.");
        }
    }

    @PostMapping("/{sessionId}/start")
    public QuizSession startQuiz(@PathVariable String sessionId) {
        return quizSessionService.startQuiz(sessionId);
    }

    @PostMapping("/submitAnswer")
    public QuizSession submitAnswer(@RequestBody SubmitAnswerRequest request) {
        return quizSessionService.submitAnswer(request);
    }

    @PostMapping("/submitOpenAnswer")
    public QuizSession submitOpenAnswer(@RequestBody SubmitOpenAnswerRequest request) {
        return quizSessionService.submitOpenAnswer(request);
    }

    @PostMapping("/end")
    public QuizSession endQuiz(@RequestBody EndQuizRequest request) {
        return quizSessionService.endQuiz(request);
    }

}