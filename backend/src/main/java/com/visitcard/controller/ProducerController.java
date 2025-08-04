package com.visitcard.controller;
import com.visitcard.entity.Producers;
import com.visitcard.service.ProducerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @GetMapping("/by-login")
    public ResponseEntity<?> getByLogin(@RequestParam String login) {
        try {
            List<Producers> producers = producerService.getByLogin(login);
            return ResponseEntity.ok(producers);
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

    @PatchMapping("/by-name/fields")
    public ResponseEntity<?> updateFieldsByName(
            @RequestParam String name,
            @RequestBody Map<String, String> updates) {
        try {
            Producers updated = producerService.updateFieldsByName(name, updates);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
