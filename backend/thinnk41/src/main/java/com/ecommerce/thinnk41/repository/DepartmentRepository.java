package com.ecommerce.thinnk41.repository;

import com.ecommerce.thinnk41.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Integer> {
    
    /**
     * Find department by name
     */
    Optional<Department> findByName(String name);
    
    /**
     * Check if department exists by name
     */
    boolean existsByName(String name);
    
    /**
     * Get all departments with product count using JOIN
     */
    @Query("SELECT d, COUNT(p.id) as productCount FROM Department d LEFT JOIN d.products p GROUP BY d.id, d.name, d.description")
    List<Object[]> findAllDepartmentsWithProductCount();
    
    /**
     * Get department with product count by ID
     */
    @Query("SELECT d, COUNT(p.id) as productCount FROM Department d LEFT JOIN d.products p WHERE d.id = :id GROUP BY d.id, d.name, d.description")
    Optional<Object[]> findDepartmentWithProductCountById(@Param("id") Integer id);
} 