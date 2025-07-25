package com.visitcard.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
@Getter
@Setter
@Table(name = "admins")
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "login",unique = true, nullable = false)
    private String login;

    @Column(nullable = false)
    private String password;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "main_page_id", referencedColumnName = "id", nullable = true)
    private MainPage mainPage;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "contact_id", referencedColumnName = "id", nullable = true)
    private Contact contact;

    @OneToMany(mappedBy = "admin", cascade = CascadeType.ALL)
    private List<Producers> producers;

    public String getUsername() {
        return login;
    }
}