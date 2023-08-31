package com.example.practice.service;

import com.example.practice.helper.FileUploadHelper;
import com.example.practice.model.Resume;
import com.example.practice.model.ResumeData;
import com.example.practice.model.Student;
import com.example.practice.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


@Service
public class StudentServiceImpl implements StudentService {
    @Autowired
    private StudentRepository studentRepository;
    private StudentService studentService;
    private FileUploadHelper fileUploadHelper;

    @Override
    public Resume saveStudent(Resume resume) {
        return studentRepository.save(resume);
    }

    @Override
    public List<Resume> showStudent() {
        return studentRepository.findAll();
    }

    @Override
    public ResumeData parseResume(String filePath) throws IOException {
        String text = "";

        if (filePath.endsWith(".docx")) {
            text = parseDocx(filePath);
        } else if (filePath.endsWith(".pdf")) {
            text = parsePdf(filePath);
        } else {
            throw new IllegalArgumentException("Unsupported file format");
        }

        return extractInfoFromText(text);
    }

    @Override
    public String parseDocx(String filePath) throws IOException  {
        XWPFDocument doc = new XWPFDocument(new FileInputStream(filePath));
        XWPFWordExtractor extractor = new XWPFWordExtractor(doc);
        return extractor.getText();
    }

    @Override
    public String parsePdf(String filePath) throws IOException {
        PDDocument document = Loader.loadPDF(new File(filePath)); // Use PDDocument.load with a File
        PDFTextStripper stripper = new PDFTextStripper();
        String text = stripper.getText(document);
        document.close();
        return text;
    }

    @Override
    public ResumeData extractInfoFromText(String text) {
        ResumeData parsedInfo = new ResumeData();
        String[] lines = text.split("\n");
        String name = "";
        String email = "";
        String phone = "";
        String gender = "";
        String maritalStatus = "";
        String knownLanguages = "";

        List<String> skills = new ArrayList<>();

        // Regular expressions for email and phone number extraction
        String emailRegex = "\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,7}\\b";
        String phoneRegex = "(\\+\\d{1,2}\\s?)?(\\(\\d{3}\\)|\\d{3})[\\s.-]?\\d{3}[\\s.-]?\\d{4}";

        // Sample list of skills to search for
        List<String> sampleSkills = Arrays.asList(
                "python", "java", "mysql", "opencv", "image processing", "pid", "ml", "dbms",
                "html", "bootstrap", "css", "php", "phpmyadmin", "software testing", "software development",
                "software engineering", "computer vision", "internet of things", "data analysis",
                "machine learning", "communication", ".net"
        );


        for (String line : lines) {

            // Extract name, email, and phone using regex
            if (name.isEmpty() && line.split("\\s+").length >= 2) {
                name = line.trim();
            }
            Matcher emailMatcher = Pattern.compile(emailRegex).matcher(line);
            if (emailMatcher.find()) {
                email = emailMatcher.group();
            }
            Matcher phoneMatcher = Pattern.compile(phoneRegex).matcher(line);
            if (phoneMatcher.find()) {
                phone = phoneMatcher.group();
            }

            // Extract other information using regex
            if (line.toLowerCase().contains("gender")) {
                Matcher genderMatcher = Pattern.compile("(male|female)", Pattern.CASE_INSENSITIVE).matcher(line);
                if (genderMatcher.find()) {
                    gender = genderMatcher.group();
                }
            }

            if (line.toLowerCase().contains("marital status")) {
                Matcher maritalStatusMatcher = Pattern.compile("(single|married)", Pattern.CASE_INSENSITIVE).matcher(line);
                if (maritalStatusMatcher.find()) {
                    maritalStatus = maritalStatusMatcher.group();
                }
            }

            if (line.toLowerCase().contains("known languages")) {
                knownLanguages = line.split(":")[1].trim();
            }



            // Extract skills (unique skills only)
            for (String skill : sampleSkills) {
                if (line.toLowerCase().contains(skill) && !skills.contains(skill)) {
                    skills.add(skill);
                }
            }
        }

        parsedInfo.setName(name);
        parsedInfo.setEmail(email);
        parsedInfo.setPhone(phone);
        parsedInfo.setGender(gender);
        parsedInfo.setMaritalStatus(maritalStatus);
        parsedInfo.setKnownLanguages(knownLanguages);
        parsedInfo.setSkills(List.of(skills.toString()));
        return parsedInfo;
    }

    @Override
    public String uploadResume(MultipartFile resumeFile) throws IOException {
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
