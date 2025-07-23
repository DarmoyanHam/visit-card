package com.visitcard.repository;

import com.visitcard.entity.Producers;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProducerRepository extends JpaRepository<Producers, Long> {

    Optional<Producers> findByName(String name);
}