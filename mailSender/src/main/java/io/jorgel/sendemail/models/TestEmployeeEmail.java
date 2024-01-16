package io.jorgel.sendemail.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;
import java.util.Map;


@Getter
@Setter
@ToString
public class TestEmployeeEmail extends Email{
    private String employeeName;
    private String testLink;

    public TestEmployeeEmail(String to, String from, String subject, String content, String employeeName, String testLink) {
        super(to, from, subject, content);
        this.employeeName = employeeName;
        this.testLink = testLink;
    }

}
