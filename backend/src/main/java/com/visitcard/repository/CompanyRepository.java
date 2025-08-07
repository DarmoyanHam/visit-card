package com.visitcard.repository;
import com.visitcard.entity.Company;
import com.visitcard.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
public interface CompanyRepository extends JpaRepository<Company, Integer> {
    Optional<Company> findById(Long id);

    boolean existsById(Long id);

    void deleteById(Long id);
}
