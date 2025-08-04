package com.visitcard.controller;

import com.visitcard.dto.LoginRequest;
import com.visitcard.entity.Admin;
import com.visitcard.entity.Contact;
import com.visitcard.entity.MainPage;
import com.visitcard.repository.AdminRepository;
import com.visitcard.repository.MainRepository;
import com.visitcard.service.AdminService;
import com.visitcard.configuration.JwtUtil;
import com.visitcard.service.CustomUserDetailsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private AdminService adminService;

    @Autowired
    private MainRepository mainRepository;

    @Autowired
    private AdminRepository adminRepository;

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginRequest request) {
        UsernamePasswordAuthenticationToken authInputToken =
                new UsernamePasswordAuthenticationToken(request.getLogin(), request.getPassword());
        authManager.authenticate(authInputToken);

        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getLogin());
        final String token = jwtUtil.generateToken(userDetails.getUsername());

        Admin admin = adminRepository.findByLogin(request.getLogin())
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        admin.setToken(token);
        adminRepository.save(admin);

        return Map.of("token", token);
    }

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody Admin admin) {
        admin.setContact(new Contact());
        admin.setProducers(new ArrayList<>());
        Admin registered = adminService.register(admin);
        String token = jwtUtil.generateToken(registered.getLogin());
        MainPage mainPage = new MainPage();
        mainPage.setLogin(registered.getLogin());
        mainPage.setPassword(registered.getPassword());
        admin.setToken(token);
        mainPage.setAdmin(registered);
        registered.setMainPage(mainPage);
        mainRepository.save(mainPage);
        return Map.of("token", token);
    }
}
