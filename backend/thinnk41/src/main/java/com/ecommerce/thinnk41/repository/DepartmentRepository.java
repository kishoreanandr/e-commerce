package com.ecommerce.thinnk41.repository;

import com.ecommerce.thinnk41.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Integer> {
    
    // Find department by name
    Optional<Department> findByName(String name);
    
    // Check if department exists by name
    boolean existsByName(String name);
} 