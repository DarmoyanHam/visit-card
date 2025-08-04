package com.visitcard.service;

import com.visitcard.entity.Admin;
import com.visitcard.entity.Producers;
import com.visitcard.repository.AdminRepository;
import com.visitcard.repository.ProducerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ProducerService {

    @Autowired
    private final ProducerRepository producerRepository;

    @Autowired
    private AdminRepository adminRepository;

    public ProducerService(ProducerRepository producerRepository) {
        this.producerRepository = producerRepository;
    }

    public List<Producers> getAll() {
        return producerRepository.findAll();
    }

    public List<Producers> getByLogin(String login) {
        Admin admin = adminRepository.findByLogin(login)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        List<Producers> list = admin.getProducers();
        if (list == null || list.isEmpty()) {
            throw new RuntimeException("No producers found for this user");
        }

        return list;
    }

    public Producers getByName(String name) {
        return producerRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Producer with name '" + name + "' not found"));
    }

    public Producers save(Producers producer) {
        return producerRepository.save(producer);
    }

    public void delete(Long id) {
        producerRepository.deleteById(id);
    }

    public Producers updateFieldsByName(String name, Map<String, String> updates) {
        Producers producer = getByName(name);

        updates.forEach((field, value) -> {
            switch (field) {
                case "name" -> producer.setName(value);
                case "logoUrl" -> producer.setLogoUrl(value);
                case "number" -> {
                    try {
                        producer.setNumber(Integer.parseInt(value));
                    } catch (NumberFormatException e) {
                        throw new IllegalArgumentException("Field 'number' must be an integer");
                    }
                }
                default -> throw new IllegalArgumentException("Unknown field: " + field);
            }
        });

        return producerRepository.save(producer);
    }

}
