package com.ecommerce.thinnk41.service;

import com.ecommerce.thinnk41.entity.Product;
import com.ecommerce.thinnk41.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;
    
    /**
     * Get all products with pagination
     */
    public Page<Product> getAllProducts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findAll(pageable);
    }
    
    /**
     * Get a specific product by ID
     */
    public Optional<Product> getProductById(Integer id) {
        return productRepository.findById(id);
    }
    
    /**
     * Get products by category with pagination
     */
    public Page<Product> getProductsByCategory(String category, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findByCategory(category, pageable);
    }
    
    /**
     * Get products by brand with pagination
     */
    public Page<Product> getProductsByBrand(String brand, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findByBrand(brand, pageable);
    }
    
    /**
     * Get products by department with pagination
     */
    public Page<Product> getProductsByDepartment(String department, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findByDepartment(department, pageable);
    }
    
    /**
     * Search products by name with pagination
     */
    public Page<Product> searchProductsByName(String name, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findByNameContainingIgnoreCase(name, pageable);
    }
} 