package com.visitcard.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
@Table(name = "design")
public class Design {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "main_page_id")
    private MainPage mainPage;

    @Column(name = "password")
    private String password;

    @Column(name = "name_en")
    private String nameEn;

    @Column(name = "name_ru")
    private String nameRu;

    @Column(name = "name_hy")
    private String nameHy;

    @Column(name = "logo")
    private String logo;

    @Column(name = "background_image_url")
    private String backgroundImageUrl;

    @Column(name = "slogan_position_en")
    private String slogan_positionEn;

    @Column(name = "slogan_position_hy")
    private String slogan_positionHy;

    @Column(name = "slogan_position_ru")
    private String slogan_positionRu;

    @Column(name = "icon_background_color")
    private String iconBackgroundColor;

    @Column(name = "logo_background_color")
    private String logoBackgroundColor;

    @Column(name = "name_color")
    private String nameColor;

    @Column(name = "slogan_position_color")
    private String slogan_positionColor;

    @Column(name = "buttons_color")
    private String buttonsColor;

    @Column(name = "add_contact_color")
    private String addContactColor;

    @Column(name = "language_color")
    private String languageColor;

    @Column(name = "version")
    private int version = 1;
}
