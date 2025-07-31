package com.ecommerce.thinnk41.service;

import com.ecommerce.thinnk41.dto.DepartmentWithProductCountDTO;
import com.ecommerce.thinnk41.dto.ProductDTO;
import com.ecommerce.thinnk41.entity.Department;
import com.ecommerce.thinnk41.entity.Product;
import com.ecommerce.thinnk41.repository.DepartmentRepository;
import com.ecommerce.thinnk41.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DepartmentService {
    
    @Autowired
    private DepartmentRepository departmentRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    /**
     * Get all departments
     */
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }
    
    /**
     * Get all departments with product count
     */
    public List<DepartmentWithProductCountDTO> getAllDepartmentsWithProductCount() {
        List<Object[]> results = departmentRepository.findAllDepartmentsWithProductCount();
        return results.stream()
                .map(result -> {
                    Department department = (Department) result[0];
                    Long productCount = (Long) result[1];
                    return DepartmentWithProductCountDTO.fromEntity(department, productCount);
                })
                .collect(Collectors.toList());
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
     * Get department with product count by ID
     */
    public Optional<DepartmentWithProductCountDTO> getDepartmentWithProductCountById(Integer id) {
        Optional<Object[]> result = departmentRepository.findDepartmentWithProductCountById(id);
        return result.map(obj -> {
            Department department = (Department) obj[0];
            Long productCount = (Long) obj[1];
            return DepartmentWithProductCountDTO.fromEntity(department, productCount);
        });
    }
    
    /**
     * Get products by department ID with pagination
     */
    public Page<ProductDTO> getProductsByDepartmentId(Integer departmentId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> products = productRepository.findByDepartmentId(departmentId, pageable);
        return products.map(ProductDTO::fromEntity);
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