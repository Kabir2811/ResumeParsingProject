package com.example.practice.service;

import com.example.practice.UserNotFoundException;
import com.example.practice.model.JD;
import com.example.practice.model.JDData;
import com.example.practice.model.Resume;
import com.example.practice.model.ResumeData;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface JDService {

    public JDData parseJD(String filePath) throws IOException;
    public JD saveJd(JD jd);

    public List<JD> showJds();
    public JD get(Integer id) throws UserNotFoundException;
    public String parseDocx(String filePath) throws IOException;

    public String parsePdf(String filePath) throws IOException;

    public JDData extractInfoFromText(String text);

    public String uploadJD(@RequestParam("jdFile") MultipartFile jdfile) throws IOException ;
}
