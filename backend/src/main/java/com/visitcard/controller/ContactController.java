package com.visitcard.controller;

import com.visitcard.entity.Contact;
import com.visitcard.service.ContactService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

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

    @GetMapping("/by-token")
    public ResponseEntity<?> getContactByToken(@RequestHeader("Authorization") String authorizationHeader) {
        try {
            String token = authorizationHeader.replace("Bearer ", "");
            Contact contact = contactService.getByToken(token);
            return ResponseEntity.ok(contact);
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

    @PatchMapping("/by-token/fields")
    public ResponseEntity<?> updateByLogin(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody Map<String, String> updates) {
        try {
            String token = authHeader.replace("Bearer ", "").trim();
            Contact updated = contactService.updateFieldsByLogin(token, updates);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
