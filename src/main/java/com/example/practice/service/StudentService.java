package com.example.practice.service;
import com.example.practice.UserNotFoundException;
import com.example.practice.model.Resume;
import com.example.practice.model.ResumeData;
import com.example.practice.model.Student;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;


public interface StudentService {
    public Resume saveStudent(Resume resume);
    public List<Resume> showStudent();

    public ResumeData parseResume(String filePath) throws IOException;

    public String parseDocx(String filePath) throws IOException;

    public String parsePdf(String filePath) throws IOException;

    public ResumeData extractInfoFromText(String text);

    public String uploadResume(@RequestParam("resumeFile") MultipartFile resumeFile) throws IOException ;

    public Resume get(Integer id) throws UserNotFoundException;

}
