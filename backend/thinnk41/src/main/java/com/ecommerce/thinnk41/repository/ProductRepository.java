package com.ecommerce.thinnk41.repository;

import com.ecommerce.thinnk41.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    
    // Find products by category with pagination
    Page<Product> findByCategory(String category, Pageable pageable);
    
    // Find products by brand with pagination
    Page<Product> findByBrand(String brand, Pageable pageable);
    
    // Find products by department ID with pagination
    Page<Product> findByDepartmentId(Integer departmentId, Pageable pageable);
    
    // Find products by department name using JOIN
    @Query("SELECT p FROM Product p JOIN p.department d WHERE d.name = :departmentName")
    Page<Product> findByDepartmentName(@Param("departmentName") String departmentName, Pageable pageable);
    
    // Find products by name (case-insensitive) with pagination
    Page<Product> findByNameContainingIgnoreCase(String name, Pageable pageable);
    
    // New method: Get all products with department names using JOIN
    @Query("SELECT p, d.name as departmentName FROM Product p LEFT JOIN p.department d")
    Page<Object[]> findAllProductsWithDepartmentNames(Pageable pageable);
    
    // Get products with department names by category
    @Query("SELECT p, d.name as departmentName FROM Product p LEFT JOIN p.department d WHERE p.category = :category")
    Page<Object[]> findProductsWithDepartmentNamesByCategory(@Param("category") String category, Pageable pageable);
    
    // Get products with department names by brand
    @Query("SELECT p, d.name as departmentName FROM Product p LEFT JOIN p.department d WHERE p.brand = :brand")
    Page<Object[]> findProductsWithDepartmentNamesByBrand(@Param("brand") String brand, Pageable pageable);
} 