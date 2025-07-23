package com.visitcard.controller;

import com.visitcard.entity.MainPage;
import com.visitcard.service.MainService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/main")
public class MainController {

    private final MainService mainService;

    public MainController(MainService mainService) {
        this.mainService = mainService;
    }

    @GetMapping
    public List<MainPage> getAll() {
        return mainService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MainPage> getById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(mainService.getById(id));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<MainPage> save(@RequestBody MainPage mainPage) {
        return ResponseEntity.ok(mainService.save(mainPage));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        mainService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/field")
    public ResponseEntity<?> updateField(
            @PathVariable Long id,
            @RequestParam String fieldName,
            @RequestParam String value) {
        try {
            MainPage updated = mainService.updateField(id, fieldName, value);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
