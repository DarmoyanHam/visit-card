package com.visitcard.service;

import com.visitcard.entity.Producers;
import com.visitcard.repository.ProducerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProducerService {

    @Autowired
    private final ProducerRepository producerRepository;

    public ProducerService(ProducerRepository producerRepository) {
        this.producerRepository = producerRepository;
    }

    public List<Producers> getAll() {
        return producerRepository.findAll();
    }

    public Producers getById(Long id) {
        return producerRepository.findById(id).orElseThrow(() -> new RuntimeException("Producer not found"));
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

    public Producers updateFieldByName(String name, String fieldName, String value) {
        Producers producer = getByName(name);

        switch (fieldName) {
            case "name":
                producer.setName(value);
                break;
            case "logoUrl":
                producer.setLogoUrl(value);
                break;
            case "number":
                try {
                    producer.setNumber(Integer.parseInt(value));
                } catch (NumberFormatException e) {
                    throw new IllegalArgumentException("Field 'number' must be an integer");
                }
                break;
            default:
                throw new IllegalArgumentException("Unknown field: " + fieldName);
        }

        return producerRepository.save(producer);
    }

}
