package io.jorgel.sendemail.services;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import io.jorgel.sendemail.models.Email;
import io.jorgel.sendemail.models.InterviewEmployeeEmail;
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
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class ConsumerService {
    private static final Logger LOGGER = LogManager.getLogger(ConsumerService.class);
    private final EmailSenderService emailSenderService;

    @Autowired
    public ConsumerService(EmailSenderService emailSenderService) {
        this.emailSenderService = emailSenderService;
    }

    @KafkaListener(topics = "${kafka.topics.test}")
    public void sendEmployeeTestEmails(ConsumerRecord<?, ?> commandsRecord) throws MessagingException, IOException {
        LOGGER.log(Level.INFO, () -> String.format("sendConfirmationEmails() » Topic: %s", commandsRecord.topic()));
        JsonElement object = new Gson().fromJson(commandsRecord.value().toString(), JsonObject.class);

        String to = object.getAsJsonObject().get("to").getAsString();
        String from = object.getAsJsonObject().get("from").getAsString();
        String subject = object.getAsJsonObject().get("subject").getAsString();
        String content = object.getAsJsonObject().get("content").getAsString();
        String employeeName = object.getAsJsonObject().get("employeeName").getAsString();
        String testLink = object.getAsJsonObject().get("testLink").getAsString();


        TestEmployeeEmail testEmployeeEmail = new TestEmployeeEmail(to, subject, content, from, employeeName, testLink);

        LOGGER.log(Level.INFO, () -> String.format("Email content: %s", testEmployeeEmail.getContent()));
        emailSenderService.sendEmployeeTestEmail(testEmployeeEmail);
        LOGGER.log(Level.INFO, () -> " »» Mail sent successfully");
    }

    @KafkaListener(topics = "${kafka.topics.interview}")
    public void sendInterviewEmails(ConsumerRecord<?, ?> commandsRecord) throws MessagingException, IOException {
        LOGGER.log(Level.INFO, () -> String.format("sendInterviewEmails() » Topic: %s", commandsRecord.topic()));
        JsonElement object = new Gson().fromJson(commandsRecord.value().toString(), JsonObject.class);

        String to = object.getAsJsonObject().get("to").getAsString();
        String from = object.getAsJsonObject().get("from").getAsString();
        String subject = object.getAsJsonObject().get("subject").getAsString();
        String content = object.getAsJsonObject().get("content").getAsString();
        String employeeName = object.getAsJsonObject().get("employeeName").getAsString();
        String position = object.getAsJsonObject().get("position").getAsString();
        String format = object.getAsJsonObject().get("format").getAsString();
        String venue = object.getAsJsonObject().get("venue").getAsString();
        String timeString = object.getAsJsonObject().get("time").getAsString();

        // Преобразование timeString в Date
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        LocalDateTime localDateTime = LocalDateTime.parse(timeString, formatter);
        Date time = Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());

        InterviewEmployeeEmail interviewEmail = new InterviewEmployeeEmail(to, from, subject, content, employeeName, position, format, venue, time);

        LOGGER.log(Level.INFO, () -> String.format("Email content: %s", interviewEmail.getContent()));
        emailSenderService.sendInterviewEmail(interviewEmail);
        LOGGER.log(Level.INFO, () -> " »» Int   erview Mail sent successfully");
    }
}
