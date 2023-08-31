package com.example.practice.controller;

import com.example.practice.helper.FileUploadHelper;
import com.example.practice.model.Resume;
import com.example.practice.model.ResumeData;
import com.example.practice.model.Student;
import com.example.practice.repository.StudentRepository;
import com.example.practice.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/student")
public class StudentController {
    @Autowired
    private StudentService studentService;
    private final FileUploadHelper fileUploadHelper;

    private final StudentRepository studentRepository;

    public StudentController(FileUploadHelper fileUploadHelper , StudentRepository studentRepository) {
        this.fileUploadHelper = fileUploadHelper; // Initialize the dependency through constructor injection
        this.studentRepository = studentRepository;
    }

    @PostMapping("/add")
    public String addStudent(@RequestBody Resume resume){
        studentService.saveStudent(resume);
        return "New Student is added";
    }
    @GetMapping("/show")
    public List<Resume> showStudents(){
        return studentService.showStudent();
    }

    @PostMapping("/parse-file")
    public String uploadResume(@RequestParam("resumeFile") MultipartFile resumeFile) throws IOException {
        boolean uploadres = fileUploadHelper.fileUpload(resumeFile);
        if (uploadres) {
            String filePath = "C:\\Users\\P0510857\\IdeaProjects\\practice\\src\\main\\resources\\static\\resumes\\" + resumeFile.getOriginalFilename();
            ResumeData parsedData = studentService.parseResume(filePath);
            Resume resume = new Resume();
            resume.setName(parsedData.getName());
            resume.setEmail(parsedData.getEmail());
            resume.setPhone(parsedData.getPhone());
            resume.setGender(parsedData.getGender());
            resume.setKnownLanguages(parsedData.getKnownLanguages());
            resume.setMaritalStatus(parsedData.getMaritalStatus());
            resume.setSkills(parsedData.getSkills().toString());
            studentRepository.save(resume);
            return "File uploaded and parsed successfully!";
        }
        else {
            return "File upload failed.";
        }

    }
}
