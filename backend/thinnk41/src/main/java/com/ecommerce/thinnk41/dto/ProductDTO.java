package com.ecommerce.thinnk41.dto;

import com.ecommerce.thinnk41.entity.Department;
import com.ecommerce.thinnk41.entity.Product;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductDTO {
    private Integer id;
    private BigDecimal cost;
    private String category;
    private String name;
    private String brand;
    private BigDecimal retailPrice;
    private DepartmentDTO department;
    private String sku;
    private Integer distributionCenterId;
    
    public static ProductDTO fromEntity(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setCost(product.getCost());
        dto.setCategory(product.getCategory());
        dto.setName(product.getName());
        dto.setBrand(product.getBrand());
        dto.setRetailPrice(product.getRetailPrice());
        dto.setSku(product.getSku());
        dto.setDistributionCenterId(product.getDistributionCenterId());
        
        if (product.getDepartment() != null) {
            dto.setDepartment(DepartmentDTO.fromEntity(product.getDepartment()));
        }
        
        return dto;
    }
} 