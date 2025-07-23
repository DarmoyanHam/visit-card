package com.visitcard.service;

import com.visitcard.entity.Contact;
import com.visitcard.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService {

    private final ContactRepository contactRepository;

    @Autowired
    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public List<Contact> getAll() {
        return contactRepository.findAll();
    }

    public Contact getById(Long id) {
        return contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact not found"));
    }

    public Contact save(Contact contact) {
        return contactRepository.save(contact);
    }

    public void delete(Long id) {
        contactRepository.deleteById(id);
    }

    public Contact updateField(Long id, String fieldName, String value) {
        Contact contact = getById(id);

        switch (fieldName) {
            case "tel" -> contact.setTel(value);
            case "mail" -> contact.setMail(value);
            case "sms" -> contact.setSms(value);
            case "website" -> contact.setWebsite(value);
            case "location" -> contact.setLocation(value);
            case "whatsapp" -> contact.setWhatsapp(value);
            case "linkedin" -> contact.setLinkedin(value);
            case "viber" -> contact.setViber(value);
            case "telegram" -> contact.setTelegram(value);
            case "facebook" -> contact.setFacebook(value);
            case "messenger" -> contact.setMessenger(value);
            case "instagram" -> contact.setInstagram(value);
            case "tiktok" -> contact.setTiktok(value);
            case "youtube" -> contact.setYoutube(value);
            case "twitter" -> contact.setTwitter(value);
            case "vk" -> contact.setVk(value);
            case "snapchat" -> contact.setSnapchat(value);
            default -> throw new IllegalArgumentException("Unknown field: " + fieldName);
        }

        return contactRepository.save(contact);
    }
}
