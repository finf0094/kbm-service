package kz.qbm.app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CuratorDTO {

    private String fullName;
    private Date dateOfBirth;
    private String identityNumber;
    private String curatorNumber;
    private String workPhoneNumber;
    private String personalPhoneNumber;
    private String email;
    private String education;
    private String certificateNumber;
    private Integer totalWorkExperience;
    private Integer curatorWorkExperience;
    private Integer workExperienceInCurrentPosition;
    private String academicDegree;
    private String academicTitle;

}