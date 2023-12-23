package kz.qbm.app.service.kafka;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import kz.qbm.app.dto.kafka.TestEmployeeEmail;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class ProducerService {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;

    @Autowired
    public ProducerService(KafkaTemplate<String, String> kafkaTemplate, ObjectMapper objectMapper) {
        this.kafkaTemplate = kafkaTemplate;
        this.objectMapper = objectMapper;
    }

    public void sendEmail(String topic, TestEmployeeEmail testEmployeeEmail) {
        try {
            String message = objectMapper.writeValueAsString(testEmployeeEmail);
            kafkaTemplate.send(topic, message);
        } catch (JsonProcessingException e) {
            log.error("Json processing error: ", e);
        }
    }
}