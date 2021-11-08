package com.udacity.jdnd.course3.petstore.entity;

import com.udacity.jdnd.course3.petstore.user.EmployeeSkill;

import org.hibernate.annotations.Nationalized;
import javax.persistence.*;
import java.time.LocalDate;
import java.util.*;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Schedule {
    @Id
    @GeneratedValue
    private Long id;

    @Nationalized
    private LocalDate date;

    @ManyToMany(cascade = CascadeType.ALL)
    private List<Employee> employeeList;

    @ManyToMany(cascade = CascadeType.ALL)
    private List<Customer> customerList;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Pet> petList;

    @ElementCollection
    @Enumerated
    private Set<EmployeeSkill> employeeSkills;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Employee> getEmployeeList() {
        return employeeList;
    }

    public void setEmployeeList(List<Employee> employeeList) {
        this.employeeList = employeeList;
    }

    public List<Customer> getCustomerList() {
        return customerList;
    }

    public void setCustomerList(List<Customer> customerList) {
        this.customerList = customerList;
    }

    public List<Pet> getPetList() {
        return petList;
    }

    public void setPetList(List<Pet> petList) {
        this.petList = petList;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Set<EmployeeSkill> getEmployeeSkills() {
        return employeeSkills;
    }

    public void setEmployeeSkills(Set<EmployeeSkill> employeeSkills) {
        this.employeeSkills = employeeSkills;
    }
}
