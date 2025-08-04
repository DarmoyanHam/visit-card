package com.visitcard.service;

import com.visitcard.entity.Admin;
import com.visitcard.entity.Contact;
import com.visitcard.repository.AdminRepository;
import com.visitcard.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ContactService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private final ContactRepository contactRepository;

    @Autowired
    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public List<Contact> getAll() {
        return contactRepository.findAll();
    }



    public Contact getByToken(String token) {
        Admin admin = adminRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        Contact contact = admin.getContact();
        if (contact == null) throw new RuntimeException("Contact not found");
        return contact;
    }

    public Contact save(Contact contact) {
        return contactRepository.save(contact);
    }

    public void delete(Long id) {
        contactRepository.deleteById(id);
    }

    public Contact updateFieldsByLogin(String token, Map<String, String> updates) {
        Contact contact = getByToken(token);

        updates.forEach((field, value) -> {
            switch (field) {
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
                default -> throw new IllegalArgumentException("Unknown field: " + field);
            }
        });

        return contactRepository.save(contact);
    }

}
