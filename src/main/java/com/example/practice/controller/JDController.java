package com.example.practice.controller;


import com.example.practice.helper.JDUploadHelper;
import com.example.practice.model.JD;
import com.example.practice.model.JDData;
import com.example.practice.model.Resume;
import com.example.practice.model.ResumeData;
import com.example.practice.repository.JDRepository;
import com.example.practice.service.JDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/jd")
public class JDController {
    @Autowired
    private JDService jdService;

    private final JDRepository jdRepository;


    public JDController( JDRepository jdRepository) {

        this.jdRepository = jdRepository;

    }

    @PostMapping("/add")
    public ResponseEntity<Integer> addJd(@RequestBody JD jd){
        JD savedJd = jdService.saveJd(jd);
        Integer lastInsertedId = savedJd.getId();
        return ResponseEntity.ok(lastInsertedId);
    }
    @GetMapping("/show")
    public List<JD> showJds(){
        return jdService.showJds();
    }

    @GetMapping("/table")
    public List<JD> getAllJds() {
        return jdRepository.findAll();
    }
    @GetMapping("data/{id}")
    public ResponseEntity<JD> getJdById(@PathVariable Integer id) {
        Optional<JD> studentOptional = jdRepository.findById(id);
        return studentOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/parse-jd")
    public ResponseEntity<Integer> uploadJD(@RequestParam("jdfile") MultipartFile jdfile) throws IOException {
        boolean uploadres = JDUploadHelper.fileUpload(jdfile);
        if (uploadres) {
            String filePath = "C:\\Users\\P0510857\\IdeaProjects\\practice\\src\\main\\resources\\static\\jd\\" + jdfile.getOriginalFilename();
            JDData parsedData = jdService.parseJD(filePath);
            JD resume = new JD();

            resume.setGender(parsedData.getGender());
            resume.setKnownLanguages(parsedData.getKnownLanguages());

            resume.setSkills(parsedData.getSkills().toString());
            jdRepository.save(resume);

            // Return the ID of the newly inserted student
            return ResponseEntity.ok(resume.getId());
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
