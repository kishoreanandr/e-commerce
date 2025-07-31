package com.ecommerce.thinnk41.dto;

import com.ecommerce.thinnk41.entity.Department;
import lombok.Data;

@Data
public class DepartmentDTO {
    private Integer id;
    private String name;
    private String description;
    
    public static DepartmentDTO fromEntity(Department department) {
        DepartmentDTO dto = new DepartmentDTO();
        dto.setId(department.getId());
        dto.setName(department.getName());
        dto.setDescription(department.getDescription());
        return dto;
    }
} 