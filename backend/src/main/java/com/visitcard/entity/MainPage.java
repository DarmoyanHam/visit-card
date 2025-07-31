package com.visitcard.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "main_page")
public class MainPage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "password")
    private String password;

    @Column(name = "login")
    private String login;

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

    @Column(name = "token")
    private String token;

    @OneToMany(mappedBy = "mainPage", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Design> designs = new ArrayList<>();

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "admin_id", referencedColumnName = "id", nullable = true)
    @JsonManagedReference
    private Admin admin;
}
