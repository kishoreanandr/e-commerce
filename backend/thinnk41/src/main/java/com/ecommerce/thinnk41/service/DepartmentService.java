package com.ecommerce.thinnk41.service;

import com.ecommerce.thinnk41.entity.Department;
import com.ecommerce.thinnk41.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DepartmentService {
    
    @Autowired
    private DepartmentRepository departmentRepository;
    
    /**
     * Get all departments
     */
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }
    
    /**
     * Get department by ID
     */
    public Optional<Department> getDepartmentById(Integer id) {
        return departmentRepository.findById(id);
    }
    
    /**
     * Get department by name
     */
    public Optional<Department> getDepartmentByName(String name) {
        return departmentRepository.findByName(name);
    }
    
    /**
     * Create or get department by name
     */
    public Department createOrGetDepartment(String name) {
        Optional<Department> existingDepartment = departmentRepository.findByName(name);
        if (existingDepartment.isPresent()) {
            return existingDepartment.get();
        } else {
            Department newDepartment = new Department();
            newDepartment.setName(name);
            return departmentRepository.save(newDepartment);
        }
    }
    
    /**
     * Check if department exists by name
     */
    public boolean existsByName(String name) {
        return departmentRepository.existsByName(name);
    }
} 