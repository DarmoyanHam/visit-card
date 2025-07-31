package com.visitcard.dto;

import com.visitcard.entity.Design;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DesignDto {
    private String password;
    private String nameEn;
    private String nameRu;
    private String nameHy;
    private String logo;
    private String backgroundImageUrl;
    private String slogan_positionEn;
    private String slogan_positionHy;
    private String slogan_positionRu;
    private String iconBackgroundColor;
    private String logoBackgroundColor;
    private String nameColor;
    private String slogan_positionColor;
    private String buttonsColor;
    private String addContactColor;
    private String languageColor;

    public DesignDto(Design design) {
        this.nameEn = design.getNameEn();
        this.nameRu = design.getNameRu();
        this.nameHy = design.getNameHy();
        this.logo = design.getLogo();
        this.backgroundImageUrl = design.getBackgroundImageUrl();
        this.slogan_positionEn = design.getSlogan_positionEn();
        this.slogan_positionHy = design.getSlogan_positionHy();
        this.slogan_positionRu = design.getSlogan_positionRu();
        this.iconBackgroundColor = design.getIconBackgroundColor();
        this.logoBackgroundColor = design.getLogoBackgroundColor();
        this.nameColor = design.getNameColor();
        this.slogan_positionColor = design.getSlogan_positionColor();
        this.buttonsColor = design.getButtonsColor();
        this.addContactColor = design.getAddContactColor();
        this.languageColor = design.getLanguageColor();
    }
}
