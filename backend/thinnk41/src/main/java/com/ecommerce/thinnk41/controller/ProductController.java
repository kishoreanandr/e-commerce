package com.ecommerce.thinnk41.controller;

import com.ecommerce.thinnk41.entity.Product;
import com.ecommerce.thinnk41.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*") // Enable CORS for frontend integration
public class ProductController {
    
    @Autowired
    private ProductService productService;
    
    /**
     * GET /api/products - List all products with pagination
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        try {
            Page<Product> productsPage = productService.getAllProducts(page, size);
            
            Map<String, Object> response = new HashMap<>();
            response.put("products", productsPage.getContent());
            response.put("currentPage", productsPage.getNumber());
            response.put("totalItems", productsPage.getTotalElements());
            response.put("totalPages", productsPage.getTotalPages());
            response.put("size", productsPage.getSize());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to retrieve products");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
    
    /**
     * GET /api/products/{id} - Get a specific product by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Object> getProductById(@PathVariable Integer id) {
        
        try {
            Optional<Product> product = productService.getProductById(id);
            
            if (product.isPresent()) {
                return ResponseEntity.ok(product.get());
            } else {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("error", "Product not found");
                errorResponse.put("message", "Product with ID " + id + " does not exist");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
            }
            
        } catch (NumberFormatException e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Invalid ID format");
            errorResponse.put("message", "ID must be a valid integer");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to retrieve product");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
    
    /**
     * GET /api/products/category/{category} - Get products by category
     */
    @GetMapping("/category/{category}")
    public ResponseEntity<Map<String, Object>> getProductsByCategory(
            @PathVariable String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        try {
            Page<Product> productsPage = productService.getProductsByCategory(category, page, size);
            
            Map<String, Object> response = new HashMap<>();
            response.put("products", productsPage.getContent());
            response.put("category", category);
            response.put("currentPage", productsPage.getNumber());
            response.put("totalItems", productsPage.getTotalElements());
            response.put("totalPages", productsPage.getTotalPages());
            response.put("size", productsPage.getSize());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to retrieve products by category");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
    
    /**
     * GET /api/products/brand/{brand} - Get products by brand
     */
    @GetMapping("/brand/{brand}")
    public ResponseEntity<Map<String, Object>> getProductsByBrand(
            @PathVariable String brand,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        try {
            Page<Product> productsPage = productService.getProductsByBrand(brand, page, size);
            
            Map<String, Object> response = new HashMap<>();
            response.put("products", productsPage.getContent());
            response.put("brand", brand);
            response.put("currentPage", productsPage.getNumber());
            response.put("totalItems", productsPage.getTotalElements());
            response.put("totalPages", productsPage.getTotalPages());
            response.put("size", productsPage.getSize());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to retrieve products by brand");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
    
    /**
     * GET /api/products/search - Search products by name
     */
    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchProductsByName(
            @RequestParam String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        try {
            Page<Product> productsPage = productService.searchProductsByName(name, page, size);
            
            Map<String, Object> response = new HashMap<>();
            response.put("products", productsPage.getContent());
            response.put("searchTerm", name);
            response.put("currentPage", productsPage.getNumber());
            response.put("totalItems", productsPage.getTotalElements());
            response.put("totalPages", productsPage.getTotalPages());
            response.put("size", productsPage.getSize());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to search products");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
} 