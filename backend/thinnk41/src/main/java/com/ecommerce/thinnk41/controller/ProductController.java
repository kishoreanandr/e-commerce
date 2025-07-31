package com.ecommerce.thinnk41.controller;

import com.ecommerce.thinnk41.dto.ProductDTO;
import com.ecommerce.thinnk41.entity.Product;
import com.ecommerce.thinnk41.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<Page<ProductDTO>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Page<Product> products = productService.getAllProducts(page, size);
        Page<ProductDTO> productDTOs = products.map(ProductDTO::fromEntity);
        return ResponseEntity.ok(productDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Integer id) {
        return productService.getProductById(id)
                .map(ProductDTO::fromEntity)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<Page<ProductDTO>> getProductsByCategory(
            @PathVariable String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Page<Product> products = productService.getProductsByCategory(category, page, size);
        Page<ProductDTO> productDTOs = products.map(ProductDTO::fromEntity);
        return ResponseEntity.ok(productDTOs);
    }

    @GetMapping("/brand/{brand}")
    public ResponseEntity<Page<ProductDTO>> getProductsByBrand(
            @PathVariable String brand,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Page<Product> products = productService.getProductsByBrand(brand, page, size);
        Page<ProductDTO> productDTOs = products.map(ProductDTO::fromEntity);
        return ResponseEntity.ok(productDTOs);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<ProductDTO>> searchProductsByName(
            @RequestParam String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Page<Product> products = productService.searchProductsByName(name, page, size);
        Page<ProductDTO> productDTOs = products.map(ProductDTO::fromEntity);
        return ResponseEntity.ok(productDTOs);
    }

    @GetMapping("/department/{departmentId}")
    public ResponseEntity<Page<ProductDTO>> getProductsByDepartmentId(
            @PathVariable Integer departmentId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Page<Product> products = productService.getProductsByDepartmentId(departmentId, page, size);
        Page<ProductDTO> productDTOs = products.map(ProductDTO::fromEntity);
        return ResponseEntity.ok(productDTOs);
    }

    @GetMapping("/department/name/{departmentName}")
    public ResponseEntity<Page<ProductDTO>> getProductsByDepartmentName(
            @PathVariable String departmentName,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Page<Product> products = productService.getProductsByDepartmentName(departmentName, page, size);
        Page<ProductDTO> productDTOs = products.map(ProductDTO::fromEntity);
        return ResponseEntity.ok(productDTOs);
    }
} 