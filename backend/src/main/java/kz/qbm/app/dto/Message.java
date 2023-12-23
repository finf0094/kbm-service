package kz.qbm.app.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Message {
    private int status;
    private String message;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
    private LocalDateTime timestamp;
    public Message(int status, String message) {
        this.status = status;
        this.message = message;
        timestamp = LocalDateTime.now();
    }
}
