package com.ecommerce.thinnk41.controller;

import com.ecommerce.thinnk41.dto.DepartmentDTO;
import com.ecommerce.thinnk41.dto.DepartmentWithProductCountDTO;
import com.ecommerce.thinnk41.dto.ProductDTO;
import com.ecommerce.thinnk41.entity.Department;
import com.ecommerce.thinnk41.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/departments")
@CrossOrigin(origins = "*")
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    @GetMapping
    public ResponseEntity<Object> getAllDepartments() {
        List<DepartmentWithProductCountDTO> departments = departmentService.getAllDepartmentsWithProductCount();
        return ResponseEntity.ok(Map.of("departments", departments));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DepartmentDTO> getDepartmentById(@PathVariable Integer id) {
        return departmentService.getDepartmentById(id)
                .map(DepartmentDTO::fromEntity)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<DepartmentDTO> getDepartmentByName(@PathVariable String name) {
        return departmentService.getDepartmentByName(name)
                .map(DepartmentDTO::fromEntity)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/products")
    public ResponseEntity<Object> getProductsByDepartmentId(
            @PathVariable Integer id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        // First check if department exists
        Department department = departmentService.getDepartmentById(id).orElse(null);
        if (department == null) {
            return ResponseEntity.notFound().build();
        }
        
        // Get products for this department
        Page<ProductDTO> products = departmentService.getProductsByDepartmentId(id, page, size);
        
        return ResponseEntity.ok(Map.of(
            "department", department.getName(),
            "products", products.getContent(),
            "totalElements", products.getTotalElements(),
            "totalPages", products.getTotalPages(),
            "currentPage", products.getNumber()
        ));
    }
} 