
package com.visitcard.service;


import com.visitcard.entity.Admin;
import com.visitcard.repository.AdminRepository;
import com.visitcard.validation.LoginValidator;
import com.visitcard.validation.PasswordValidator;
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
        if (adminRepository.existsByLogin(admin.getLogin())) {
            throw new RuntimeException("Login already taken");
        }

        if (!LoginValidator.isValid(admin.getLogin())) {
            throw new RuntimeException("Invalid login format");
        }

        if (!PasswordValidator.isValid(admin.getPassword())) {
            throw new RuntimeException("Weak password");
        }

        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return adminRepository.save(admin);
    }

}
