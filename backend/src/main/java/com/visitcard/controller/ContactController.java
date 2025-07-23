package com.visitcard.controller;

import com.visitcard.entity.Contact;
import com.visitcard.service.ContactService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @GetMapping
    public List<Contact> getAll() {
        return contactService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contact> getById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(contactService.getById(id));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Contact> save(@RequestBody Contact contact) {
        return ResponseEntity.ok(contactService.save(contact));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        contactService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/field")
    public ResponseEntity<?> updateField(
            @PathVariable Long id,
            @RequestParam String fieldName,
            @RequestParam String value) {
        try {
            Contact updated = contactService.updateField(id, fieldName, value);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
