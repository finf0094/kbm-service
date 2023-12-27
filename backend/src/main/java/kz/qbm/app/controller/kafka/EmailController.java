package kz.qbm.app.controller.kafka;

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

    @PostMapping
    public ResponseEntity<Void> sendEmail(@RequestBody TestEmployeeEmail testEmployeeEmail) {
        producerService.sendEmail("send.email", testEmployeeEmail);
        return ResponseEntity.ok().build();
    }
}