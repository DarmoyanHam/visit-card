package com.visitcard.controller;

import com.visitcard.dto.DesignDto;
import com.visitcard.entity.Design;
import com.visitcard.entity.MainPage;
import com.visitcard.repository.DesignRepository;
import com.visitcard.service.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


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

    @GetMapping("/login/{login}")
    public ResponseEntity<MainPage> getByLogin(@PathVariable String login) {
        try {
            return ResponseEntity.ok(mainService.getByLogin(login));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<MainPage> save(@RequestBody MainPage mainPage) {
        return ResponseEntity.ok(mainService.save(mainPage));
    }


    @PatchMapping("/{login}/field")
    public ResponseEntity<?> updateField(
            @PathVariable String login,
            @RequestParam String fieldName,
            @RequestParam String value) {
        try {
            MainPage updated = mainService.updateField(login, fieldName, value);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/design/save/{login}")
    public ResponseEntity<String> saveDesign(@PathVariable String login) {
        mainService.saveNewDesign(login);
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
