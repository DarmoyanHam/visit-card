package com.visitcard.controller;

import com.visitcard.entity.Staff;
import com.visitcard.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/staff")
public class StaffController {

    private final StaffService staffService;

    @Autowired
    public StaffController(StaffService staffService) {
        this.staffService = staffService;
    }

    @PostMapping
    public ResponseEntity<String> createStaff(@RequestBody Staff staff) {
        try {
            staffService.createStaff(staff);
            return ResponseEntity.ok("Staff created (temporarily in memory)");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/save/{id}")
    public ResponseEntity<String> saveStaffList(@PathVariable Long id, @RequestBody List<Staff> staffList) {
        staffService.saveStaffForCompany(id, staffList);
        return ResponseEntity.ok("Staff saved");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Staff> getStaffById(@PathVariable Long id) {
        try {
            Staff staff = staffService.getStaffById(id);
            return ResponseEntity.ok(staff);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Staff>> getAllStaff() {
        List<Staff> staffList = staffService.getAllStaff();
        return ResponseEntity.ok(staffList);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Staff> updateStaff(@PathVariable Long id, @RequestBody Staff updatedStaff) {
        try {
            Staff staff = staffService.updateStaff(id, updatedStaff);
            return ResponseEntity.ok(staff);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteStaff(@PathVariable Long id) {
        try {
            staffService.deleteStaff(id);
            return ResponseEntity.ok("Staff deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}