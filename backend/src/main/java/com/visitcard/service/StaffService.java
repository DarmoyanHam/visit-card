package com.visitcard.service;

import com.visitcard.entity.Staff;
import com.visitcard.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StaffService {
    @Autowired
    private StaffRepository staffRepository;

    private List<Staff> staffList = new ArrayList();

    public void createStaff(Staff staff) {
        Staff newStaff = null;
        newStaff.setName(staff.getName());
        newStaff.setPosition(staff.getPosition());
        newStaff.setCompany(staff.getCompany());
        newStaff.setPhoneNumber(staff.getPhoneNumber());
        staffList.add(newStaff);
    }

    public void saveStaff(List<Staff> staffList) {
        staffRepository.saveAll(staffList);
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
        staffRepository.deleteById(id);
    }
}
