package io.jorgel.sendemail.services;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import io.jorgel.sendemail.models.Email;
import io.jorgel.sendemail.models.TestEmployeeEmail;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.*;

@Service
public class ConsumerService {
    private static final Logger LOGGER = LogManager.getLogger(ConsumerService.class);
    private final EmailSenderService emailSenderService;

    @Autowired
    public ConsumerService(EmailSenderService emailSenderService) {
        this.emailSenderService = emailSenderService;
    }

    @KafkaListener(topics = "${kafka.topics.data}")
    public void sendEmployeeTestEmails(ConsumerRecord<?, ?> commandsRecord) throws MessagingException, IOException {
        LOGGER.log(Level.INFO, () -> String.format("sendConfirmationEmails() » Topic: %s", commandsRecord.topic()));
        JsonElement object = new Gson().fromJson(commandsRecord.value().toString(), JsonObject.class);

        JsonElement toElement = object.getAsJsonObject().get("to");
        JsonElement fromElement = object.getAsJsonObject().get("from");
        JsonElement subjectElement = object.getAsJsonObject().get("subject");
        JsonElement contentElement = object.getAsJsonObject().get("content");
        JsonElement employeeNameElement = object.getAsJsonObject().get("employeeName");
        JsonElement testLinksElement = object.getAsJsonObject().get("testLinks");

        if (subjectElement == null) {
            LOGGER.log(Level.ERROR, "Subject is null");
            return;
        }
        if (toElement == null) {
            LOGGER.log(Level.ERROR, "To is null");
            return;
        }
        if (fromElement == null) {
            LOGGER.log(Level.ERROR, "From is null");
        }
        if (employeeNameElement == null) {
            LOGGER.log(Level.ERROR, "employeeName is null");
        }
        if (testLinksElement == null) {
            LOGGER.log(Level.ERROR, "testLinks is null");
        }

        List<String> testLinks = new ArrayList<>();
        if (testLinksElement.isJsonArray()) {
            JsonArray testLinksArray = testLinksElement.getAsJsonArray();
            for (JsonElement element : testLinksArray) {
                if (element.isJsonPrimitive()) {
                    testLinks.add(element.getAsString());
                }
            }
        }


        var subject = subjectElement.getAsString();
        var to = toElement.getAsString();
        var content = contentElement.getAsString();
        var from = contentElement.getAsString();
        var employeeName = employeeNameElement.getAsString();

        Map<String, Object> props = new HashMap<>();
        props.put("subscriptionDate", new Date());

        TestEmployeeEmail testEmployeeEmail = new TestEmployeeEmail(to, subject, content,from,  props, employeeName, testLinks);

        LOGGER.log(Level.INFO, () -> String.format("Email content: %s", testEmployeeEmail.getContent()));
        emailSenderService.sendEmployeeTestEmail(testEmployeeEmail);
        LOGGER.log(Level.INFO, () -> " »» Mail sent successfully");
    }
}
