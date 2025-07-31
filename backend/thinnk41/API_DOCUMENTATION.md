# E-commerce API Documentation

## Base URL
```
http://localhost:8080/api
```

## Product Endpoints

### 1. Get All Products (Paginated)
- **URL**: `GET /products`
- **Query Parameters**:
  - `page` (optional): Page number (default: 0)
  - `size` (optional): Page size (default: 20)
- **Response**: Spring Data Page with ProductDTO objects
- **Example**: `GET /api/products?page=0&size=10`

### 2. Get Product by ID
- **URL**: `GET /products/{id}`
- **Response**: ProductDTO object
- **Example**: `GET /api/products/1`

### 3. Get Products by Category
- **URL**: `GET /products/category/{category}`
- **Query Parameters**:
  - `page` (optional): Page number (default: 0)
  - `size` (optional): Page size (default: 20)
- **Response**: Spring Data Page with ProductDTO objects
- **Example**: `GET /api/products/category/Tops%20%26%20Tees?page=0&size=10`

### 4. Get Products by Brand
- **URL**: `GET /products/brand/{brand}`
- **Query Parameters**:
  - `page` (optional): Page number (default: 0)
  - `size` (optional): Page size (default: 20)
- **Response**: Spring Data Page with ProductDTO objects
- **Example**: `GET /api/products/brand/Seven7?page=0&size=10`

### 5. Search Products by Name
- **URL**: `GET /products/search`
- **Query Parameters**:
  - `name`: Product name to search for
  - `page` (optional): Page number (default: 0)
  - `size` (optional): Page size (default: 20)
- **Response**: Spring Data Page with ProductDTO objects
- **Example**: `GET /api/products/search?name=Seven7&page=0&size=10`

### 6. Get Products by Department ID
- **URL**: `GET /products/department/{departmentId}`
- **Query Parameters**:
  - `page` (optional): Page number (default: 0)
  - `size` (optional): Page size (default: 20)
- **Response**: Spring Data Page with ProductDTO objects
- **Example**: `GET /api/products/department/2?page=0&size=10`

### 7. Get Products by Department Name
- **URL**: `GET /products/department/name/{departmentName}`
- **Query Parameters**:
  - `page` (optional): Page number (default: 0)
  - `size` (optional): Page size (default: 20)
- **Response**: Spring Data Page with ProductDTO objects
- **Example**: `GET /api/products/department/name/Women?page=0&size=10`

## Department Endpoints

### 1. Get All Departments with Product Count
- **URL**: `GET /departments`
- **Response**: Object with departments array containing DepartmentWithProductCountDTO objects
- **Example**: `GET /api/departments`

**Response Format**:
```json
{
  "departments": [
    {
      "id": 1,
      "name": "Electronics",
      "description": "Electronic devices and accessories",
      "productCount": 25
    },
    {
      "id": 2,
      "name": "Women",
      "description": "Women's clothing and accessories",
      "productCount": 150
    }
  ]
}
```

### 2. Get Department by ID
- **URL**: `GET /departments/{id}`
- **Response**: DepartmentDTO object
- **Example**: `GET /api/departments/2`

### 3. Get Department by Name
- **URL**: `GET /departments/name/{name}`
- **Response**: DepartmentDTO object
- **Example**: `GET /api/departments/name/Women`

### 4. Get Products by Department ID
- **URL**: `GET /departments/{id}/products`
- **Query Parameters**:
  - `page` (optional): Page number (default: 0)
  - `size` (optional): Page size (default: 20)
- **Response**: Object with department name and products array
- **Example**: `GET /api/departments/2/products?page=0&size=10`

**Response Format**:
```json
{
  "department": "Women",
  "products": [
    {
      "id": 1,
      "name": "Seven7 Women's Long Sleeve Stripe Belted Top",
      "brand": "Seven7",
      "category": "Tops & Tees",
      "retailPrice": 49.00,
      "cost": 27.05,
      "department": {
        "id": 2,
        "name": "Women",
        "description": null
      },
      "sku": "C4CA4238A0B923820DCC509A6F75849B",
      "distributionCenterId": 1
    }
  ],
  "totalElements": 150,
  "totalPages": 8,
  "currentPage": 0
}
```

## Response Formats

### ProductDTO
```json
{
  "id": 1,
  "cost": 27.05,
  "category": "Tops & Tees",
  "name": "Seven7 Women's Long Sleeve Stripe Belted Top",
  "brand": "Seven7",
  "retailPrice": 49.00,
  "department": {
    "id": 2,
    "name": "Women",
    "description": null
  },
  "sku": "C4CA4238A0B923820DCC509A6F75849B",
  "distributionCenterId": 1
}
```

### DepartmentDTO
```json
{
  "id": 2,
  "name": "Women",
  "description": "Women's clothing and accessories"
}
```

### DepartmentWithProductCountDTO
```json
{
  "id": 2,
  "name": "Women",
  "description": "Women's clothing and accessories",
  "productCount": 150
}
```

## HTTP Status Codes

- **200 OK**: Request successful
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server error

## Error Response Format
```json
{
  "error": "Error message",
  "message": "Detailed error description"
}
```

## Database Schema

### Products Table
- `id` (Primary Key)
- `cost` (DECIMAL)
- `category` (VARCHAR)
- `name` (TEXT)
- `brand` (VARCHAR)
- `retail_price` (DECIMAL)
- `department_id` (Foreign Key to departments.id)
- `sku` (VARCHAR)
- `distribution_center_id` (INTEGER)

### Departments Table
- `id` (Primary Key)
- `name` (VARCHAR, Unique)
- `description` (TEXT)

### Distribution Centers Table
- `id` (Primary Key)
- `name` (VARCHAR)
- `location` (VARCHAR)

## Testing with cURL

### Test Department Endpoints
```bash
# Get all departments with product count
curl -X GET "http://localhost:8080/api/departments"

# Get department by ID
curl -X GET "http://localhost:8080/api/departments/2"

# Get department by name
curl -X GET "http://localhost:8080/api/departments/name/Women"

# Get products by department ID
curl -X GET "http://localhost:8080/api/departments/2/products?page=0&size=5"
```

### Test Product Endpoints
```bash
# Get all products
curl -X GET "http://localhost:8080/api/products?page=0&size=5"

# Get product by ID
curl -X GET "http://localhost:8080/api/products/1"

# Search products
curl -X GET "http://localhost:8080/api/products/search?name=Seven7"

# Get products by category
curl -X GET "http://localhost:8080/api/products/category/Tops%20%26%20Tees"

# Get products by brand
curl -X GET "http://localhost:8080/api/products/brand/Seven7"
``` 