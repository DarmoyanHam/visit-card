package com.visitcard.controller;

import com.visitcard.dto.LoginRequest;
import com.visitcard.entity.Admin;
import com.visitcard.service.AdminService;
import com.visitcard.configuration.JwtUtil;
import com.visitcard.service.CustomUserDetailsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginRequest request) {
        UsernamePasswordAuthenticationToken authInputToken =
                new UsernamePasswordAuthenticationToken(request.getLogin(), request.getPassword());
        authManager.authenticate(authInputToken);
        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getLogin());
        final String token = jwtUtil.generateToken(userDetails.getUsername());
        return Map.of("token", token);
    }

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody Admin admin) {
        Admin registered = adminService.register(admin);
        final String token = jwtUtil.generateToken(registered.getLogin());

        return Map.of("token", token);
    }
}
