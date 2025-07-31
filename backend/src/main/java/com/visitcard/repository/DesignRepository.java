package com.visitcard.repository;

import com.visitcard.entity.Design;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DesignRepository extends JpaRepository<Design, Long> {
    int countByMainPageId(Long mainPageId);
    Optional<Design> findByMainPageIdAndVersion(Long mainPageId, int version);
}
