package com.ecommerce.thinnk41.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "cost", precision = 10, scale = 2)
    private BigDecimal cost;
    
    @Column(name = "category")
    private String category;
    
    @Column(name = "name", columnDefinition = "TEXT")
    private String name;
    
    @Column(name = "brand")
    private String brand;
    
    @Column(name = "retail_price", precision = 10, scale = 2)
    private BigDecimal retailPrice;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "department_id")
    private Department department;
    
    @Column(name = "sku")
    private String sku;
    
    @Column(name = "distribution_center_id")
    private Integer distributionCenterId;
} 