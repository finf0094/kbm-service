package io.jorgel.sendemail.services.impl;

import io.jorgel.sendemail.models.InterviewEmployeeEmail;
import io.jorgel.sendemail.models.TestEmployeeEmail;
import io.jorgel.sendemail.services.EmailSenderService;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@Service
public class EmailSenderServiceImpl implements EmailSenderService {

    private static final Logger LOGGER = LogManager.getLogger(EmailSenderServiceImpl.class);

    private final JavaMailSender javaMailSender;
    private final SpringTemplateEngine templateEngine;

    @Autowired
    public EmailSenderServiceImpl(JavaMailSender javaMailSender, SpringTemplateEngine templateEngine) {
        this.javaMailSender = javaMailSender;
        this.templateEngine = templateEngine;
    }


    @Override
    public void sendEmployeeTestEmail(TestEmployeeEmail testEmployeeEmail) throws MessagingException, IOException {
        LOGGER.log(Level.INFO, () -> String.format("» sendConfirmationEmail(%s)", testEmployeeEmail.getTo()));
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,
                MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                StandardCharsets.UTF_8.name());

        Context context = new Context();
        context.setVariable("employeeName", testEmployeeEmail.getEmployeeName()); 
        context.setVariable("testLinks", testEmployeeEmail.getTestLink()); 
        String html = templateEngine.process("test", context);

        helper.setTo(testEmployeeEmail.getTo());
        helper.setText(html, true);
        helper.setSubject(testEmployeeEmail.getSubject());
        helper.setFrom(testEmployeeEmail.getFrom());

        javaMailSender.send(message);
    }

    @Override
    public void sendInterviewEmail(InterviewEmployeeEmail interviewEmployeeEmail) throws MessagingException, IOException {
        LOGGER.log(Level.INFO, () -> String.format("» sendInterviewEmail(%s)", interviewEmployeeEmail.getTo()));
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,
                MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                StandardCharsets.UTF_8.name());

        Context context = new Context();
        context.setVariable("userName", interviewEmployeeEmail.getEmployeeName()); 
        context.setVariable("position", interviewEmployeeEmail.getPosition()); 
        context.setVariable("format", interviewEmployeeEmail.getFormat()); 
        context.setVariable("venue", interviewEmployeeEmail.getVenue()); 
        context.setVariable("curatorName", interviewEmployeeEmail.getCuratorName());
        LocalDateTime time = LocalDateTime.ofInstant(interviewEmployeeEmail.getTime().toInstant(), ZoneId.systemDefault());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");
        String formattedDateTime = time.format(formatter);
        context.setVariable("time", formattedDateTime);

        String html = templateEngine.process("interview", context);

        helper.setTo(interviewEmployeeEmail.getTo());
        helper.setText(html, true);
        helper.setSubject(interviewEmployeeEmail.getSubject());
        helper.setFrom(interviewEmployeeEmail.getFrom());

        javaMailSender.send(message);
    }
}
