package com.visitcard.service;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.Paths;
import java.time.Instant;

@Service
public class ImageService {

    private final String baseDir = "images";

    public String saveLogoImage(String base64Image, Long companyId) throws Exception {
        if (base64Image == null || base64Image.isEmpty()) {
            System.out.println("Error: base64Image for logo is null or empty");
            return null;
        }

        if (base64Image.contains(",")) {
            base64Image = base64Image.substring(base64Image.indexOf(",") + 1);
        }
        byte[] imageBytes = Base64.decodeBase64(base64Image);

        File dir = Paths.get(baseDir, "company_" + companyId, "logos").toFile();
        if (!dir.exists()) {
            System.out.println("Creating logo directory: " + dir.getAbsolutePath());
            dir.mkdirs();
        }

        String filename = "logo_" + Instant.now().getEpochSecond() + ".png";
        File outputFile = new File(dir, filename);

        System.out.println("Saving logo to: " + outputFile.getAbsolutePath());

        try (OutputStream os = new FileOutputStream(outputFile)) {
            os.write(imageBytes);
        } catch (Exception e) {
            System.out.println("Error saving logo: " + e.getMessage());
            throw e;
        }

        String filePath = Paths.get(baseDir, "company_" + companyId, "logos", filename).toString();
        System.out.println("Saved logo path: " + filePath);
        return filePath;
    }

    public String saveStaffImage(String base64Image, Long companyId, String staffName) throws Exception {
        if (base64Image == null || base64Image.isEmpty()) {
            System.out.println("Error: base64Image for staff " + staffName + " is null or empty");
            return null;
        }

        if (base64Image.contains(",")) {
            base64Image = base64Image.substring(base64Image.indexOf(",") + 1);
        }
        byte[] imageBytes = Base64.decodeBase64(base64Image);

        File dir = Paths.get(baseDir, "company_" + companyId, "staff").toFile();
        if (!dir.exists()) {
            System.out.println("Creating staff directory: " + dir.getAbsolutePath());
            dir.mkdirs();
        }

        String safeStaffName = staffName.replaceAll("[^a-zA-Z0-9]", "_");
        String filename = "staff_" + safeStaffName + "_" + Instant.now().getEpochSecond() + ".png";
        File outputFile = new File(dir, filename);

        System.out.println("Saving staff photo to: " + outputFile.getAbsolutePath());

        try (OutputStream os = new FileOutputStream(outputFile)) {
            os.write(imageBytes);
        } catch (Exception e) {
            System.out.println("Error saving staff photo: " + e.getMessage());
            throw e;
        }

        String filePath = Paths.get(baseDir, "company_" + companyId, "staff", filename).toString();
        System.out.println("Saved staff photo path: " + filePath);
        return filePath;
    }

    public String filePathToBase64(String filePath) throws Exception {
        File file;
        if (filePath.startsWith("images") || filePath.startsWith("/images")) {
            file = new File(filePath);
        } else {
            file = Paths.get("images", filePath).toFile();
        }
        if (!file.exists()) {
            System.out.println("Error: File not found at: " + file.getAbsolutePath());
            throw new FileNotFoundException("File not found: " + file.getAbsolutePath());
        }
        try (InputStream inputStream = new FileInputStream(file);
             ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            byte[] buffer = new byte[8192];
            int bytesRead;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                baos.write(buffer, 0, bytesRead);
            }
            byte[] imageBytes = baos.toByteArray();
            return Base64.encodeBase64String(imageBytes);
        }
    }
}