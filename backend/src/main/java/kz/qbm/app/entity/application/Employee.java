package kz.qbm.app.entity.application;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;


@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "employee_informations")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(nullable = false, updatable = false, unique = true)
    private Long employeeId;

    @Column(nullable = false)
    private Date birthDate;

    @Column(nullable = false, unique = true)
    private String personnelNumber;

    @Column(nullable = false, unique = true)
    private String phoneNumber;

    @Column(nullable = false)
    private String citizenship;

    @Column(nullable = false)
    private String familyStatus;

    @Column(nullable = false)
    private String informationAboutChildren;

    @CreationTimestamp
    @Column(updatable = false, name = "created_at")
    private Date createdAt;

    public void update(Employee newEmployee) {
        // Update all fields based on the newEmployee
        this.setBirthDate(newEmployee.getBirthDate());
        this.setPersonnelNumber(newEmployee.getPersonnelNumber());
        this.setPhoneNumber(newEmployee.getPhoneNumber());
        this.setCitizenship(newEmployee.getCitizenship());
        this.setFamilyStatus(newEmployee.getFamilyStatus());
        this.setInformationAboutChildren(newEmployee.getInformationAboutChildren());
        // You may need to update other fields as well

        // Note: If you have any special handling or validations, you can add them here
    }
}
