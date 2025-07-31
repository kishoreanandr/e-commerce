package com.ecommerce.thinnk41.dto;

import com.ecommerce.thinnk41.entity.Product;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductWithDepartmentDTO {
    private Integer id;
    private BigDecimal cost;
    private String category;
    private String name;
    private String brand;
    private BigDecimal retailPrice;
    private String departmentName;
    private String sku;
    private Integer distributionCenterId;
    
    public static ProductWithDepartmentDTO fromObjectArray(Object[] result) {
        ProductWithDepartmentDTO dto = new ProductWithDepartmentDTO();
        
        if (result.length >= 2) {
            Product product = (Product) result[0];
            String departmentName = (String) result[1];
            
            dto.setId(product.getId());
            dto.setCost(product.getCost());
            dto.setCategory(product.getCategory());
            dto.setName(product.getName());
            dto.setBrand(product.getBrand());
            dto.setRetailPrice(product.getRetailPrice());
            dto.setSku(product.getSku());
            dto.setDistributionCenterId(product.getDistributionCenterId());
            dto.setDepartmentName(departmentName);
        }
        
        return dto;
    }
} 