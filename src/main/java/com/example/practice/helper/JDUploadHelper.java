package com.example.practice.helper;

import org.springframework.web.multipart.MultipartFile;

import java.io.FileOutputStream;
import java.io.InputStream;

public class JDUploadHelper {
    public static final String UPLOAD_DIR = "C:\\Users\\P0510857\\IdeaProjects\\practice\\src\\main\\resources\\static\\jd";

    public static boolean fileUpload(MultipartFile multipartFile){
        boolean f= false;

        try {
            InputStream is = multipartFile.getInputStream();
            byte[] data = new byte[is.available()];
            is.read(data);

            FileOutputStream fos = new FileOutputStream(UPLOAD_DIR+"\\"+multipartFile.getOriginalFilename());
            fos.write(data);
            fos.close();
            f=true;

        }catch (Exception e){
            e.printStackTrace();
        }

        return f;
    }
}
