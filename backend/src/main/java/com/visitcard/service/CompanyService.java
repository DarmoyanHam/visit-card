package com.visitcard.service;

import com.visitcard.entity.Company;
import com.visitcard.entity.Staff;
import com.visitcard.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    public Company createCompany(Company company) {
        for (Staff staff : company.getStaffList()) {
            staff.setCompany(company);
        }
        return companyRepository.save(company);
    }

    public Company getCompanyById(Long id) {
        return companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found with id: " + id));
    }

    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    public Company updateCompany(Long id, Company updatedCompany) {
        Company existing = getCompanyById(id);
        existing.setName(updatedCompany.getName());
        existing.setLogoUrl(updatedCompany.getLogoUrl());
        existing.getStaffList().clear();
        for (Staff staff : updatedCompany.getStaffList()) {
            staff.setCompany(existing);
            existing.getStaffList().add(staff);
        }

        return companyRepository.save(existing);
    }

    public void deleteCompany(Long id) {
        if (!companyRepository.existsById(id)) {
            throw new RuntimeException("Company not found with id: " + id);
        }
        companyRepository.deleteById(id);
    }
}

