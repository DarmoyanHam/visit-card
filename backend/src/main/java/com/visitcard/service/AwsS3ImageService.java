package com.visitcard.service;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.util.Base64;

@Service
public class AwsS3ImageService {

    private final S3Client s3Client;

    @Value("${aws.s3.bucket}")
    private String bucketName;

    @Value("${aws.region}")
    private String region;

    public AwsS3ImageService(S3Client s3Client) {
        this.s3Client = s3Client;
    }
    public String uploadBase64Image(String base64Image, Long companyId, String staffName) throws Exception {
        if (base64Image.contains(",")) {
            base64Image = base64Image.substring(base64Image.indexOf(",") + 1);
        }
        byte[] imageBytes = Base64.getDecoder().decode(base64Image);
        String safeStaffName = staffName.replaceAll("[^a-zA-Z0-9]", "_");
        String fileName = "company_" + companyId + "/staff_" + safeStaffName + "_" + System.currentTimeMillis() + ".png";
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .contentType("image/png")
                .acl("public-read")
                .build();
        s3Client.putObject(putObjectRequest, RequestBody.fromBytes(imageBytes));
        return "https://" + bucketName + ".s3." + region + ".amazonaws.com/" + fileName;
    }
}

