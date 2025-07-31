package com.ecommerce.thinnk41.repository;

import com.ecommerce.thinnk41.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    
    // Find products by category
    Page<Product> findByCategory(String category, Pageable pageable);
    
    // Find products by brand
    Page<Product> findByBrand(String brand, Pageable pageable);
    
    // Find products by department
    Page<Product> findByDepartment(String department, Pageable pageable);
    
    // Find products by name containing (case-insensitive)
    Page<Product> findByNameContainingIgnoreCase(String name, Pageable pageable);
} 