package com.example.practice.controller;

import com.example.practice.UserNotFoundException;
import com.example.practice.helper.FileUploadHelper;
import com.example.practice.model.Resume;
import com.example.practice.model.ResumeData;
import com.example.practice.repository.StudentRepository;
import com.example.practice.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

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

    @GetMapping("data/{id}")
    public ResponseEntity<Resume> getStudentData(@PathVariable Integer id) {
        // Fetch the student data based on the 'id'
        Optional<Resume> studentOptional = studentRepository.findById(id);

        if (studentOptional.isPresent()) {
            Resume student = studentOptional.get();
            return ResponseEntity.ok(student);
        } else {
            return ResponseEntity.notFound().build();
        }
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
            return "form";
        }
        else {
            return "File upload failed.";
        }

    }


    @PutMapping("/update-resume/{id}")
    public String showEditForm(@PathVariable("id") Integer id , Model model,  RedirectAttributes ra){
        try{
            Resume resume = studentService.get(id);
            model.addAttribute("resume",resume);
            model.addAttribute("pageTitle","Edit Resume for User (ID: " + id + ")");

            return "StudentForm";
        }
        catch (UserNotFoundException e){
            ra.addFlashAttribute("message","User not found..");
            return "redirect:/student";
        }
    }
    @GetMapping("/upload")
    public String showUploadForm() {
        return "upload";
    }

    @GetMapping("/resume/{id}")
    public String getResumeById(@PathVariable Integer id) {
        Optional<Resume> existingResumeOptional = studentRepository.findById(id);

        if (existingResumeOptional.isPresent()) {
            Resume existingResume = existingResumeOptional.get();
            return "ResumeForm";
        } else {
            return "redirect:/student";
        }
    }


}
