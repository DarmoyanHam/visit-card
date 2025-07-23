package com.visitcard.controller;
import com.visitcard.entity.Producers;
import com.visitcard.service.ProducerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/producers")
public class ProducerController {
    private final ProducerService producerService;

    public ProducerController(ProducerService producerService) {
        this.producerService = producerService;
    }

    @GetMapping
    public List<Producers> getAll() {
        return producerService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producers> getById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(producerService.getById(id));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Producers> save(@RequestBody Producers producer) {
        return ResponseEntity.ok(producerService.save(producer));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        producerService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/by-name/field")
    public ResponseEntity<?> updateFieldByName(
            @RequestParam String name,
            @RequestParam String fieldName,
            @RequestParam String value) {
        try {
            Producers updated = producerService.updateFieldByName(name, fieldName, value);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
