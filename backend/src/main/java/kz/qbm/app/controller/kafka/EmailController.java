package kz.qbm.app.controller.kafka;

import kz.qbm.app.dto.kafka.interview.InterviewEmployeeEmail;
import kz.qbm.app.dto.kafka.test.TestEmployeeEmail;
import kz.qbm.app.service.kafka.ProducerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/email")
public class EmailController {

    private final ProducerService producerService;

    @Autowired
    public EmailController(ProducerService producerService) {
        this.producerService = producerService;
    }

    @PostMapping("/test")
    public ResponseEntity<Void> sendTestEmail(@RequestBody TestEmployeeEmail testEmployeeEmail) {
        producerService.sendTestEmail(testEmployeeEmail);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/interview")
    public ResponseEntity<Void> sendInterviewEmail(@RequestBody InterviewEmployeeEmail interviewEmployeeEmail) {
        producerService.sendInterviewEmail(interviewEmployeeEmail);
        return ResponseEntity.ok().build();
    }
}