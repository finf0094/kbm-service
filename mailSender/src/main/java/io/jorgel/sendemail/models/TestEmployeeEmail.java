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
    private List<String> testLinks;

    public TestEmployeeEmail(String to, String from, String subject, String content, Map<String, Object> props, String employeeName, List<String> testLinks) {
        super(to, from, subject, content, props);
        this.employeeName = employeeName;
        this.testLinks = testLinks;
    }

}
