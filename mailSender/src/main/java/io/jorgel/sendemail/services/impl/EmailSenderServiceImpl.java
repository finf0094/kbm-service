package io.jorgel.sendemail.services.impl;

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
        context.setVariables(testEmployeeEmail.getProps());
        context.setVariable("employeeName", testEmployeeEmail.getEmployeeName()); // Set the employeeName variable
        context.setVariable("testLinks", testEmployeeEmail.getTestLinks()); // Set the testLinks variable
        String html = templateEngine.process("confirmation", context);

        helper.setTo(testEmployeeEmail.getTo());
        helper.setText(html, true);
        helper.setSubject(testEmployeeEmail.getSubject());
        helper.setFrom(testEmployeeEmail.getFrom());

        javaMailSender.send(message);
    }
}
