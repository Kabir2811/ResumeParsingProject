package com.example.practice.model;

import jakarta.persistence.*;

@Entity
public class Resume {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String email;
    private String phone;
    private String gender;
    private String maritalStatus;
    private String knownLanguages;
    @Column(length = 10000)
    private String skills ;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getMaritalStatus() {
        return maritalStatus;
    }

    public void setMaritalStatus(String maritalStatus) {
        this.maritalStatus = maritalStatus;
    }

    public String getKnownLanguages() {
        return knownLanguages;
    }

    public void setKnownLanguages(String knownLanguages) {
        this.knownLanguages = knownLanguages;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }



    @Override
    public String toString() {
        return "Name: " + name +
                "\nEmail: " + email +
                "\nPhone: " + phone +
                "\nGender: " + gender +
                "\nMarital Status: " + maritalStatus +
                "\nKnown Languages: " + knownLanguages +
                "\nSkills: " + String.join(", ", skills);
    }
}
