package com.visitcard.controller;

import com.visitcard.dto.DesignDto;
import com.visitcard.entity.Design;
import com.visitcard.entity.MainPage;
import com.visitcard.repository.DesignRepository;
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


    @PatchMapping("/{token}/fields")
    public ResponseEntity<?> updateFields(
            @PathVariable String token,
            @RequestBody Map<String, String> updates) {
        try {
            MainPage updated = mainService.updateFields(token, updates);
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
