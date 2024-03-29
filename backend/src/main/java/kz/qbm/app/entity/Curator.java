package kz.qbm.app.entity;


import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
@Table(name = "curators")
public class Curator {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "birth_date")
    private String birthDate;

    @Column(name = "itin")
    private String itin;

    @Column(name = "curator_number")
    private String curatorNumber;

    @Column(name = "work_phone_number")
    private String workPhoneNumber;

    @Column(name = "personal_phone_number")
    private String personalPhoneNumber;

    @Column(name = "email")
    private String email;

    @Column(name = "education")
    private String education;

    @Column(name = "certificate_number")
    private String certificateNumber;

    @Column(name = "total_work_experience")
    private Integer totalWorkExperience;

    @Column(name = "curator_work_experience")
    private Integer curatorWorkExperience;

    @Column(name = "work_experience_in_current_position")
    private Integer workExperienceInCurrentPosition;

    @Column(name = "academic_degree")
    private String academicDegree;

    @Column(name = "academic_title")
    private String academicTitle;

    // Геттеры и сеттеры
}