package com.visitcard.controller;

import com.visitcard.dto.DesignDto;
import com.visitcard.entity.Design;
import com.visitcard.entity.MainPage;
import com.visitcard.repository.DesignRepository;
import com.visitcard.security.JwtTokenProvider;
import com.visitcard.service.MainService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;


@RestController
@RequestMapping("/api/main")
public class MainController {
    @Autowired
    private DesignRepository designRepository;
    @Autowired
    private MainService mainService;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public MainController(MainService mainService) {
        this.mainService = mainService;
    }

    @GetMapping("/token")
    public ResponseEntity<MainPage> getMainPageByToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            MainPage mainPage = mainService.getByToken(token);
            if (mainPage != null) {
                return ResponseEntity.ok(mainPage);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PostMapping
    public ResponseEntity<MainPage> save(@RequestBody MainPage mainPage) {
        return ResponseEntity.ok(mainService.save(mainPage));
    }


    @PatchMapping("/fields")
    public ResponseEntity<?> updateFields(
            @RequestBody Map<String, String> updates,
            HttpServletRequest request) {
        System.out.println("PATCH /fields called");
        String authHeader = request.getHeader("Authorization");
        System.out.println("Authorization header: " + authHeader);
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid Authorization header");
            }
            String token = authHeader.substring(7);
            String username = jwtTokenProvider.getUsernameFromToken(token);
            System.out.println("Extracted username: " + username);
            MainPage updated = mainService.updateFieldsByUsername(username, updates);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/design/save/{token}")
    public ResponseEntity<String> saveDesign(@PathVariable String token) {
        mainService.saveNewDesign(token);
        return ResponseEntity.ok("Design saved successfully");
    }

    @GetMapping("/design/{mainPageId}/version/{version}")
    public ResponseEntity<DesignDto> getDesign(
            @PathVariable Long mainPageId,
            @PathVariable int version) {
        Design design = designRepository
                .findByMainPageIdAndVersion(mainPageId, version)
                .orElseThrow(() -> new RuntimeException("Design not found"));
        return ResponseEntity.ok(new DesignDto(design));
    }

}
