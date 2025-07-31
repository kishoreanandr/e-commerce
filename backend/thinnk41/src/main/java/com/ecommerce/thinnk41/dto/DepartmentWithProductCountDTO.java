package com.ecommerce.thinnk41.dto;

import com.ecommerce.thinnk41.entity.Department;
import lombok.Data;

@Data
public class DepartmentWithProductCountDTO {
    private Integer id;
    private String name;
    private String description;
    private Long productCount;
    
    public static DepartmentWithProductCountDTO fromEntity(Department department, Long productCount) {
        DepartmentWithProductCountDTO dto = new DepartmentWithProductCountDTO();
        dto.setId(department.getId());
        dto.setName(department.getName());
        dto.setDescription(department.getDescription());
        dto.setProductCount(productCount);
        return dto;
    }
} 