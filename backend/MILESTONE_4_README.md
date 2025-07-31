# Milestone 4: Database Refactoring - Departments Table

## Overview

This milestone focuses on refactoring the database structure to move department information into a separate table and establish proper foreign key relationships. This improves data normalization and referential integrity.

## 🎯 **Objectives**

1. ✅ Create a new `departments` table
2. ✅ Extract unique department names from existing `products` data
3. ✅ Populate the `departments` table with unique department names
4. ✅ Update the `products` table to reference departments via foreign key
5. ✅ Update the existing products API to include department information

## 📊 **Database Changes**

### Before Refactoring:
```sql
-- Products table had department as a string field
CREATE TABLE products (
    id INT PRIMARY KEY,
    cost DECIMAL(10,2),
    category VARCHAR(255),
    name TEXT,
    brand VARCHAR(255),
    retail_price DECIMAL(10,2),
    department VARCHAR(255),  -- String field
    sku VARCHAR(255),
    distribution_center_id INT
);
```

### After Refactoring:
```sql
-- New departments table
CREATE TABLE departments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT
);

-- Updated products table with foreign key
CREATE TABLE products (
    id INT PRIMARY KEY,
    cost DECIMAL(10,2),
    category VARCHAR(255),
    name TEXT,
    brand VARCHAR(255),
    retail_price DECIMAL(10,2),
    department_id INT,  -- Foreign key to departments
    sku VARCHAR(255),
    distribution_center_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);
```

## 🔧 **Implementation Details**

### 1. New Entity Classes

#### Department Entity (`Department.java`)
```java
@Entity
@Table(name = "departments")
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "name", unique = true, nullable = false)
    private String name;
    
    @Column(name = "description")
    private String description;
    
    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Product> products;
}
```

#### Updated Product Entity (`Product.java`)
```java
@Entity
@Table(name = "products")
public class Product {
    // ... other fields ...
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;
    
    // ... other fields ...
}
```

### 2. New Repository Interfaces

#### DepartmentRepository
```java
@Repository
public interface DepartmentRepository extends JpaRepository<Department, Integer> {
    Optional<Department> findByName(String name);
    boolean existsByName(String name);
}
```

#### Updated ProductRepository
```java
@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    // ... existing methods ...
    
    Page<Product> findByDepartmentId(Integer departmentId, Pageable pageable);
    
    @Query("SELECT p FROM Product p JOIN p.department d WHERE d.name = :departmentName")
    Page<Product> findByDepartmentName(@Param("departmentName") String departmentName, Pageable pageable);
}
```

### 3. New Service Classes

#### DepartmentService
```java
@Service
public class DepartmentService {
    public List<Department> getAllDepartments();
    public Optional<Department> getDepartmentById(Integer id);
    public Optional<Department> getDepartmentByName(String name);
    public Department createOrGetDepartment(String name);
    public boolean existsByName(String name);
}
```

### 4. New Controller Endpoints

#### DepartmentController
- `GET /api/departments` - Get all departments
- `GET /api/departments/{id}` - Get department by ID
- `GET /api/departments/name/{name}` - Get department by name

#### Updated ProductController
- `GET /api/products/department/{departmentId}` - Get products by department ID
- `GET /api/products/department/name/{departmentName}` - Get products by department name

## 🚀 **Migration Process**

### Step 1: Run Database Migration
```bash
cd backend
python database_migration.py
```

### Step 2: Verify Migration
The migration script will:
1. ✅ Create departments table
2. ✅ Extract unique departments from products
3. ✅ Populate departments table
4. ✅ Add department_id column to products
5. ✅ Update product references
6. ✅ Add foreign key constraints
7. ✅ Remove old department column
8. ✅ Verify migration success

### Step 3: Test API Endpoints
```bash
# Test department endpoints
curl -X GET "http://localhost:8080/api/departments"
curl -X GET "http://localhost:8080/api/departments/1"

# Test updated product endpoints
curl -X GET "http://localhost:8080/api/products/department/name/Electronics"
curl -X GET "http://localhost:8080/api/products/department/1"
```

## 📈 **Benefits of Refactoring**

### 1. **Data Normalization**
- Eliminates data redundancy
- Ensures data consistency
- Reduces storage requirements

### 2. **Referential Integrity**
- Foreign key constraints prevent orphaned records
- Cascade operations for data consistency
- Better data validation

### 3. **Performance Improvements**
- Indexed foreign keys for faster joins
- Reduced data duplication
- Better query optimization

### 4. **API Enhancements**
- Rich department information in responses
- Department-specific endpoints
- Better data structure for frontend consumption

## 🔍 **API Response Changes**

### Before Refactoring:
```json
{
  "id": 1,
  "name": "Smartphone",
  "department": "Electronics",
  "brand": "TechCorp"
}
```

### After Refactoring:
```json
{
  "id": 1,
  "name": "Smartphone",
  "department": {
    "id": 1,
    "name": "Electronics",
    "description": null
  },
  "brand": "TechCorp"
}
```

## 🧪 **Testing the Refactoring**

### 1. Database Verification
```sql
-- Check departments table
SELECT COUNT(*) FROM departments;
SELECT * FROM departments LIMIT 5;

-- Check products with department references
SELECT COUNT(*) FROM products WHERE department_id IS NOT NULL;

-- Verify foreign key relationships
SELECT p.name, d.name as dept_name 
FROM products p 
JOIN departments d ON p.department_id = d.id 
LIMIT 5;
```

### 2. API Testing
```bash
# Test department endpoints
curl -X GET "http://localhost:8080/api/departments"

# Test product endpoints with department info
curl -X GET "http://localhost:8080/api/products/1"

# Test department filtering
curl -X GET "http://localhost:8080/api/products/department/name/Electronics"
```

## 📋 **Migration Checklist**

- ✅ **Create departments table** with proper schema
- ✅ **Extract unique departments** from products data
- ✅ **Populate departments table** with extracted data
- ✅ **Add department_id column** to products table
- ✅ **Update product references** to use foreign keys
- ✅ **Add foreign key constraints** for data integrity
- ✅ **Remove old department column** from products table
- ✅ **Update API endpoints** to include department information
- ✅ **Test all endpoints** for proper functionality
- ✅ **Verify data integrity** and relationships

## 🎉 **Success Metrics**

- ✅ **Database Schema**: Properly normalized with foreign key relationships
- ✅ **Data Integrity**: All products have valid department references
- ✅ **API Functionality**: All endpoints return correct department information
- ✅ **Performance**: Improved query performance with indexed foreign keys
- ✅ **Maintainability**: Cleaner code structure with proper entity relationships

## 🔄 **Rollback Plan**

If migration issues occur:
1. **Backup current data** before migration
2. **Restore from backup** if needed
3. **Run migration script** with error handling
4. **Verify data integrity** after migration
5. **Test all endpoints** thoroughly

## 📚 **Additional Resources**

- [Spring Data JPA Documentation](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/)
- [MySQL Foreign Key Constraints](https://dev.mysql.com/doc/refman/8.0/en/create-table-foreign-keys.html)
- [Database Normalization](https://en.wikipedia.org/wiki/Database_normalization)

---

**Milestone 4 Complete!** 🎉

The database has been successfully refactored to use proper foreign key relationships with departments, improving data integrity and API functionality. 