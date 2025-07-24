package com.visitcard.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "producers")
public class Producers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", unique = true)
    private String name;

    @Column(name = "logo_url")
    private String logoUrl;

    @Column(name = "number")
    private int number;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    private Admin admin;
}