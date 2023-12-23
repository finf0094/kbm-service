package kz.qbm.app.dto.kafka;

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

    public TestEmployeeEmail(String to, String from, String subject, String content, String employeeName, List<String> testLinks) {
        super(to, from, subject, content);
        this.employeeName = employeeName;
        this.testLinks = testLinks;
    }

}
