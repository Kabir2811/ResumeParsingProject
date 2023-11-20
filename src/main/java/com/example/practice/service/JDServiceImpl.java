package com.example.practice.service;

import com.example.practice.UserNotFoundException;
import com.example.practice.helper.JDUploadHelper;
import com.example.practice.model.JD;
import com.example.practice.model.JDData;

import com.example.practice.repository.JDRepository;
import org.apache.pdfbox .Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
@Service
public class JDServiceImpl implements JDService{

    @Autowired
    private JDRepository jdRepository;
    private JDService jdService;
    private JDUploadHelper jdUploadHelper;
    @Override
    public JDData parseJD(String filePath) throws IOException {
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
    public JD saveJd(JD jd) {
        return jdRepository.save(jd);
    }

    @Override
    public List<JD> showJds() {
        return jdRepository.findAll();
    }
    public JD get(Integer id) throws UserNotFoundException {
        Optional<JD> result = jdRepository.findById(id);
        if(result.isPresent()){
            return result.get();
        }

        throw new UserNotFoundException("Could not find any JDs with ID "+ id);

    }

    @Override
    public String parseDocx(String filePath) throws IOException {
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
    public JDData extractInfoFromText(String text) {
        JDData parsedInfo = new JDData();
        String[] lines = text.split("\n");

        String gender = "";
        String knownLanguages = "";
        Set<String> skills = new HashSet<>(); // Using a Set to automatically remove duplicates

        // Sample list of skills to search for
        List<String> sampleSkills = Arrays.asList(
                "python", "java", "mysql", "opencv", "image processing", "pid", "ml", "dbms",
                "html", "bootstrap", "css", "php", "phpmyadmin", "software testing", "software development",
                "software engineering", "computer vision", "internet of things", "data analysis",
                "machine learning", "communication", ".net",
                "javascript", "react", "angular", "node.js", "express.js", "mongodb", "firebase",
                "c++", "c#", "ruby", "scala", "kotlin", "swift", "android development", "ios development",
                "git", "github", "docker", "kubernetes", "bash scripting", "linux administration",
                "agile methodologies", "scrum", "kanban", "project management", "data structures",
                "algorithms", "data mining", "data visualization", "big data", "cloud computing",
                "amazon web services (AWS)", "microsoft azure", "google cloud platform (GCP)",
                "virtualization", "networking", "cybersecurity", "web security", "penetration testing",
                "blockchain", "smart contracts", "cryptocurrency", "natural language processing",
                "speech recognition", "computer graphics", "game development", "virtual reality (VR)",
                "augmented reality (AR)", "web development", "front-end development", "back-end development",
                "full-stack development", "responsive design", "user experience (UX) design",
                "user interface (UI) design", "mobile app design", "data modeling", "database design",
                "sql", "nosql", "restful api", "graphql", "microservices", "serverless architecture",
                "cloud native", "devops", "continuous integration/continuous deployment (CI/CD)",
                "test-driven development (TDD)", "behavior-driven development (BDD)", "agile testing",
                "performance testing", "load testing", "security testing", "automation testing",
                "data science", "data engineering", "data warehousing", "etl", "data lakes",
                "business intelligence", "data analytics", "data governance", "data privacy",
                "statistical analysis", "deep learning", "neural networks", "computer science",
                "operating systems", "databases", "data warehousing", "data lakes", "business intelligence",
                "data analytics", "data governance", "data privacy", "statistical analysis",
                "deep learning", "neural networks", "computer science", "operating systems", "databases",
                "distributed systems", "cloud-native applications", "microservices architecture",
                "containerization", "cloud orchestration", "serverless computing", "edge computing",
                "fuzzy logic", "data engineering", "real-time processing", "stream processing",
                "event-driven architecture", "internet protocols", "network security", "wireless networks",
                "robotics", "automation", "mechatronics", "embedded systems", "control systems",
                "sensors and actuators", "artificial intelligence (AI)", "robotic process automation (RPA)",
                "human-computer interaction (HCI)", "ethics in technology", "social media marketing",
                "search engine optimization (SEO)", "content marketing", "email marketing", "digital marketing",
                "branding", "market research", "customer relationship management (CRM)",
                "salesforce", "e-commerce", "online advertising", "mobile marketing", "affiliate marketing",
                "data-driven marketing", "product management", "product lifecycle management (PLM)",
                "supply chain management", "quality assurance", "customer support", "technical support",
                "call center management", "data entry", "virtual assistance", "project coordination",
                "time management", "leadership", "teamwork", "problem-solving", "critical thinking",
                "decision-making", "creativity", "innovation", "emotional intelligence", "public speaking",
                "presentation skills", "negotiation", "conflict resolution", "interpersonal skills",
                "cross-cultural communication", "strategic planning", "financial management",
                "budgeting", "risk management", "business analysis", "market analysis", "competitive analysis",
                "business development", "sales", "accounting", "human resources", "talent acquisition",
                "employee relations", "performance management", "workplace diversity", "workplace safety",
                "organizational development", "change management", "strategic thinking", "data-driven decision-making",
                "project planning", "project execution", "project monitoring", "project closure",
                "quality management", "process improvement", "lean methodology", "six sigma",
                "customer experience", "customer satisfaction", "customer retention", "loyalty programs",
                "product development", "research and development", "innovation management", "intellectual property",
                "patent law", "copyright law", "contract law", "employment law", "privacy law",
                "regulatory compliance", "healthcare", "telemedicine", "pharmaceuticals", "biotechnology",
                "environmental sustainability", "green technology", "renewable energy", "climate change mitigation",
                "sustainable agriculture", "ecosystem preservation", "conservation biology", "wildlife conservation"
        );

        // Build a regex pattern to match skills
        String skillsPattern = "\\b(" + String.join("|", sampleSkills) + ")\\b";
        Pattern skillsRegex = Pattern.compile(skillsPattern, Pattern.CASE_INSENSITIVE);

        for (String line : lines) {
            // Extract other information using regex
            if (line.toLowerCase().contains("gender")) {
                Matcher genderMatcher = Pattern.compile("(male|female)", Pattern.CASE_INSENSITIVE).matcher(line);
                if (genderMatcher.find()) {
                    gender = genderMatcher.group();
                }
            }

            if (line.toLowerCase().contains("known languages")) {
                knownLanguages = line.split(":")[1].trim();
            }

            // Extract skills using the skills regex pattern
            Matcher skillsMatcher = skillsRegex.matcher(line.toLowerCase());
            while (skillsMatcher.find()) {
                String matchedSkill = skillsMatcher.group(1);
                skills.add(matchedSkill);
            }
        }

        parsedInfo.setGender(gender);
        parsedInfo.setKnownLanguages(knownLanguages);
        parsedInfo.setSkills(String.join(", ", skills)); // Convert set to a comma-separated string
        return parsedInfo;
    }

    @Override
    public String uploadJD(MultipartFile jdfile) throws IOException {
        boolean uploadres = JDUploadHelper.fileUpload(jdfile);
        if (uploadres) {
            String filePath = "src\\main\\resources\\static\\jd\\" + jdfile.getOriginalFilename();
            JDData parsedData = jdService.parseJD(filePath);
            JD resume = new JD();

            resume.setGender(parsedData.getGender());
            resume.setKnownLanguages(parsedData.getKnownLanguages());

            resume.setSkills(parsedData.getSkills().toString());
            jdRepository.save(resume);
            return "JD uploaded and parsed successfully!";
        }
        else {
            return "JD upload failed.";
        }
    }
}
