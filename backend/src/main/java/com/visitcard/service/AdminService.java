package com.visitcard.service;


import com.visitcard.entity.Admin;
import com.visitcard.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private final AdminRepository adminRepository;
    @Autowired
    private final PasswordEncoder passwordEncoder;

    public AdminService(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Admin register(Admin admin) {
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return adminRepository.save(admin);
    }

    public Optional<Admin> login(String login, String rawPassword) {
        Optional<Admin> admin = adminRepository.findByLogin(login);
        if (admin.isPresent() && passwordEncoder.matches(rawPassword, admin.get().getPassword())) {
            return admin;
        }
        return Optional.empty();
    }

    public Admin getById(Long id) {
        return adminRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
    }
}

