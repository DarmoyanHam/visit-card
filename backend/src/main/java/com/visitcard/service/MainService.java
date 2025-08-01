package com.visitcard.service;

import com.visitcard.entity.Design;
import com.visitcard.entity.MainPage;
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
    public MainService(MainRepository mainRepository) {
        this.mainRepository = mainRepository;
    }

    public List<MainPage> getAll() {
        return mainRepository.findAll();
    }

    public MainPage getByToken(String token) {
        return mainRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("MainPage not found"));
    }

    public MainPage save(MainPage mainPage) {
        return mainRepository.save(mainPage);
    }


    public MainPage updateFields(String token, Map<String, String> updates) {
        MainPage main = getByToken(token);

        for (Map.Entry<String, String> entry : updates.entrySet()) {
            String fieldName = entry.getKey();
            String value = entry.getValue();
            switch (fieldName) {
                case "password" -> main.setPassword(value);
                case "nameEn" -> main.setName(value);
                case "logo" -> main.setLogo(value);
                case "backgroundImageUrl" -> main.setBackgroundImageUrl(value);
                case "slogan_positionEn" -> main.setSlogan_positionEn(value);
                case "slogan_positionHy" -> main.setSlogan_positionHy(value);
                case "slogan_positionRu" -> main.setSlogan_positionRu(value);
                case "iconBackgroundColor" -> main.setIconBackgroundColor(value);
                case "logoBackgroundColor" -> main.setLogoBackgroundColor(value);
                case "nameColor" -> main.setNameColor(value);
                case "slogan_positionColor" -> main.setSlogan_positionColor(value);
                case "buttonsColor" -> main.setButtonsColor(value);
                case "addContactColor" -> main.setAddContactColor(value);
                case "languageColor" -> main.setLanguageColor(value);
                default -> throw new IllegalArgumentException("Unknown field: " + fieldName);
            }
        }
        return mainRepository.save(main);
    }

    public void saveNewDesign(String token) {
        MainPage page = mainRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("MainPage not found"));
        Design design = new Design();
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
