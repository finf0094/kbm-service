package io.jorgel.sendemail.services;

import io.jorgel.sendemail.models.Email;
import io.jorgel.sendemail.models.InterviewEmployeeEmail;
import io.jorgel.sendemail.models.TestEmployeeEmail;

import javax.mail.MessagingException;
import java.io.IOException;

public interface EmailSenderService {

    void sendEmployeeTestEmail(TestEmployeeEmail testEmployeeEmail) throws MessagingException, IOException;

    void sendInterviewEmail(InterviewEmployeeEmail interviewEmployeeEmail) throws MessagingException, IOException;
        
}
