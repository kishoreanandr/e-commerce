package com.ecommerce.thinnk41.repository;

import com.ecommerce.thinnk41.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    
    // Find products by category
    Page<Product> findByCategory(String category, Pageable pageable);
    
    // Find products by brand
    Page<Product> findByBrand(String brand, Pageable pageable);
    
    // Find products by department
    Page<Product> findByDepartmentId(Integer departmentId, Pageable pageable);
    
    // Find products by department name
    @Query("SELECT p FROM Product p JOIN p.department d WHERE d.name = :departmentName")
    Page<Product> findByDepartmentName(@Param("departmentName") String departmentName, Pageable pageable);
    
    // Find products by name containing (case-insensitive)
    Page<Product> findByNameContainingIgnoreCase(String name, Pageable pageable);
} 