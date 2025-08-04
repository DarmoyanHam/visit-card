package com.visitcard.service;

import com.visitcard.entity.Admin;
import com.visitcard.entity.Contact;
import com.visitcard.entity.Design;
import com.visitcard.entity.MainPage;
import com.visitcard.repository.AdminRepository;
import com.visitcard.repository.DesignRepository;
import com.visitcard.repository.MainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Service
public class MainService {

    @Autowired
    private final MainRepository mainRepository;
    @Autowired
    private DesignRepository designRepository;
    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    public MainService(MainRepository mainRepository) {
        this.mainRepository = mainRepository;
    }

    public List<MainPage> getAll() {
        return mainRepository.findAll();
    }

    public MainPage getByToken(String token) {
        Admin admin = adminRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        MainPage mainPage = admin.getMainPage();
        if (mainPage == null) throw new RuntimeException("Contact not found");
        return mainPage;
    }

    public MainPage save(MainPage mainPage) {
        return mainRepository.save(mainPage);
    }


    public MainPage updateFieldsByUsername(String username, Map<String, String> updates) {
        Admin admin = adminRepository.findByLogin(username)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        MainPage mainPage = mainRepository.findByAdmin(admin)
                .orElseThrow(() -> new RuntimeException("MainPage not found"));

        updates.forEach((field, value) -> {
            switch (field) {
                case "name" -> mainPage.setName(value);
                case "backgroundImageUrl" -> mainPage.setBackgroundImageUrl(value);
                case "slogan_positionEn" -> mainPage.setSlogan_positionEn(value);
                case "slogan_positionHy" -> mainPage.setSlogan_positionHy(value);
                case "slogan_positionRu" -> mainPage.setSlogan_positionRu(value);
                case "iconBackgroundColor" -> mainPage.setIconBackgroundColor(value);
                case "logoBackgroundColor" -> mainPage.setLogoBackgroundColor(value);
                case "nameColor" -> mainPage.setNameColor(value);
                case "slogan_positionColor" -> mainPage.setSlogan_positionColor(value);
                case "buttonsColor" -> mainPage.setButtonsColor(value);
                case "addContactColor" -> mainPage.setAddContactColor(value);
                case "languageColor" -> mainPage.setLanguageColor(value);
                case "token" -> admin.setToken(value);
                default -> throw new IllegalArgumentException("Unknown field: " + field);
            }
        });

        return mainRepository.save(mainPage);
    }


    public void saveNewDesign(String token) {
        Admin admin = adminRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        MainPage page = mainRepository.findByAdmin(admin)
                .orElseThrow(() -> new RuntimeException("MainPage not found"));Design design = new Design();
        design.setMainPage(page);
        design.setPassword(page.getPassword());
        design.setNameEn(page.getName());
        design.setLogo(page.getLogo());
        design.setBackgroundImageUrl(page.getBackgroundImageUrl());
        design.setSlogan_positionEn(page.getSlogan_positionEn());
        design.setSlogan_positionHy(page.getSlogan_positionHy());
        design.setSlogan_positionRu(page.getSlogan_positionRu());
        design.setIconBackgroundColor(page.getIconBackgroundColor());
        design.setLogoBackgroundColor(page.getLogoBackgroundColor());
        design.setNameColor(page.getNameColor());
        design.setSlogan_positionColor(page.getSlogan_positionColor());
        design.setButtonsColor(page.getButtonsColor());
        design.setAddContactColor(page.getAddContactColor());
        design.setLanguageColor(page.getLanguageColor());
        design.setVersion(design.getVersion() + 1);
        designRepository.save(design);
    }
}
