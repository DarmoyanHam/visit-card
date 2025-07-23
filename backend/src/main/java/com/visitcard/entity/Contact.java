package com.visitcard.entity;

import jakarta.persistence.*;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "contacts")
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tel")
    private String tel;

    @Column(name = "mail")
    private String mail;

    @Column(name = "sms")
    private String sms;

    @Column(name = "website")
    private String website;

    @Column(name = "location")
    private String location;

    @Column(name = "whatsapp")
    private String whatsapp;

    @Column(name = "linkedin")
    private String linkedin;

    @Column(name = "viber")
    private String viber;

    @Column(name = "telegram")
    private String telegram;

    @Column(name = "facebook")
    private String facebook;

    @Column(name = "messenger")
    private String messenger;

    @Column(name = "instagram")
    private String instagram;

    @Column(name = "tiktok")
    private String tiktok;

    @Column(name = "youtube")
    private String youtube;

    @Column(name = "twitter")
    private String twitter;

    @Column(name = "vk")
    private String vk;

    @Column(name = "snapchat")
    private String snapchat;
}
