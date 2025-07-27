package com.visitcard.service;

import com.visitcard.entity.MainPage;
import com.visitcard.repository.MainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MainService {

    private final MainRepository mainRepository;

    @Autowired
    public MainService(MainRepository mainRepository) {
        this.mainRepository = mainRepository;
    }

    public List<MainPage> getAll() {
        return mainRepository.findAll();
    }

    public MainPage getById(Long id) {
        return mainRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("MainPage not found"));
    }

    public MainPage save(MainPage mainPage) {
        return mainRepository.save(mainPage);
    }

    public void delete(Long id) {
        mainRepository.deleteById(id);
    }

    public MainPage updateField(Long id, String fieldName, String value) {
        MainPage main = getById(id);

        switch (fieldName) {
            case "password" -> main.setPassword(value);
            case "nameEn" -> main.setNameEn(value);
            case "nameRu" -> main.setNameRu(value);
            case "nameHy" -> main.setNameHy(value);
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

        return mainRepository.save(main);
    }
}
