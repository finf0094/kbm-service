package kz.qbm.app.controller.quiz;


import kz.qbm.app.dto.Message;
import kz.qbm.app.dto.quiz.QuizSummaryDTO;
import kz.qbm.app.entity.quiz.Quiz;
import kz.qbm.app.service.quiz.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/quizzes")
public class QuizController {
    // SERVICES
    private final QuizService quizService;

    @PutMapping
    public Quiz createOrUpdateQuiz(@RequestBody Quiz quiz) {
        return quizService.createOrUpdateQuiz(quiz);
    }

    @GetMapping("/{quizId}")
    public Quiz getQuizById(@PathVariable(name = "quizId") String quizId) {
        return quizService.getQuizById(quizId);
    }

    @DeleteMapping("/{quizId}")
    public Message deleteQuizById(@PathVariable(name = "quizId") String quizId) {
        return quizService.deleteQuizById(quizId);
    }

    @GetMapping
    public Page<QuizSummaryDTO> getAllQuizWithPagination(
            @RequestParam(name = "offset", defaultValue = "0") int offset,
            @RequestParam(name = "pageSize", defaultValue = "10") int pageSize) {
        return quizService.getAllQuizWithPagination(offset, pageSize);
    }
}
