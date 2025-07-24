package com.visitcard.controller;


import com.visitcard.entity.Admin;
import com.visitcard.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/register")
    public ResponseEntity<Admin> register(@RequestBody Admin admin) {
        return ResponseEntity.ok(adminService.register(admin));
    }

    @PostMapping("/login")
    public ResponseEntity<Admin> login(@RequestParam String login, @RequestParam String password) {
        return adminService.login(login, password)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(401).build());
    }

}
