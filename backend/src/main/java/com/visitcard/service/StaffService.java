package com.visitcard.service;

import com.visitcard.entity.Company;
import com.visitcard.entity.Staff;
import com.visitcard.repository.CompanyRepository;
import com.visitcard.repository.StaffRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.Set;
import java.util.*;

@Service
public class StaffService {
    @Autowired
    private StaffRepository staffRepository;
    @Autowired
    private CompanyRepository companyRepository;

    private Map<Long,Staff> staffList = new HashMap<>();

    public void createStaff(Staff staff) {
        Staff newStaff = null;
        newStaff.setName(staff.getName());
        newStaff.setPosition(staff.getPosition());
        newStaff.setCompany(staff.getCompany());
        newStaff.setPhoneNumber(staff.getPhoneNumber());
        staffList.put(staff.getId(), staff);
    }

    public Staff getStaffById(Long id) {
        return staffRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Staff not found with id: " + id));
    }


    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    public Staff updateStaff(Long id, Staff updatedStaff) {
        Staff existingStaff = getStaffById(id);
        existingStaff.setName(updatedStaff.getName());
        existingStaff.setPosition(updatedStaff.getPosition());
        return staffRepository.save(existingStaff);
    }

    public void deleteStaff(Long id) {
        if (!staffRepository.existsById(id)) {
            throw new RuntimeException("Staff not found with id: " + id);
        }
        staffList.remove(id);
        staffRepository.deleteById(id);
    }

    @Transactional
    public void saveStaffForCompany(Long companyId, List<Staff> staffList) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        Map<Long, Staff> existingStaffMap = company.getStaffList().stream()
                .filter(s -> s.getId() != null)
                .collect(Collectors.toMap(Staff::getId, Function.identity()));

        for (Staff staff : staffList) {
            if (staff.getId() != null && existingStaffMap.containsKey(staff.getId())) {
                Staff existingStaff = existingStaffMap.get(staff.getId());
                existingStaff.setName(staff.getName());
                existingStaff.setPosition(staff.getPosition());
                existingStaff.setPhoneNumber(staff.getPhoneNumber());
            } else {
                staff.setCompany(company);
                company.getStaffList().add(staff);
            }
        }
        Set<Long> updatedIds = staffList.stream()
                .map(Staff::getId)
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());

        company.getStaffList().removeIf(s -> s.getId() != null && !updatedIds.contains(s.getId()));

        companyRepository.save(company);
    }

}
