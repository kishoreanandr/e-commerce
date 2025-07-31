# Product REST API Documentation

## Overview
This REST API provides endpoints to manage and retrieve product information from the ecommerce database. The API has been refactored to use proper foreign key relationships with departments.

## Base URL
```
http://localhost:8080/api/products
```

## Endpoints

### 1. Get All Products
**GET** `/api/products`

Retrieves all products with pagination support.

**Query Parameters:**
- `page` (optional): Page number (default: 0)
- `size` (optional): Number of items per page (default: 10)

**Example Request:**
```
GET http://localhost:8080/api/products?page=0&size=5
```

**Example Response:**
```json
{
  "products": [
    {
      "id": 1,
      "cost": 15.50,
      "category": "Electronics",
      "name": "Smartphone",
      "brand": "TechCorp",
      "retailPrice": 299.99,
      "department": {
        "id": 1,
        "name": "Electronics",
        "description": null
      },
      "sku": "TECH-001",
      "distributionCenterId": 1
    }
  ],
  "currentPage": 0,
  "totalItems": 1000,
  "totalPages": 200,
  "size": 5
}
```

### 2. Get Product by ID
**GET** `/api/products/{id}`

Retrieves a specific product by its ID.

**Path Parameters:**
- `id`: Product ID (integer)

**Example Request:**
```
GET http://localhost:8080/api/products/1
```

**Example Response:**
```json
{
  "id": 1,
  "cost": 15.50,
  "category": "Electronics",
  "name": "Smartphone",
  "brand": "TechCorp",
  "retailPrice": 299.99,
  "department": {
    "id": 1,
    "name": "Electronics",
    "description": null
  },
  "sku": "TECH-001",
  "distributionCenterId": 1
}
```

**Error Response (Product not found):**
```json
{
  "error": "Product not found",
  "message": "Product with ID 999 does not exist"
}
```

### 3. Get Products by Category
**GET** `/api/products/category/{category}`

Retrieves products filtered by category with pagination.

**Path Parameters:**
- `category`: Product category (string)

**Query Parameters:**
- `page` (optional): Page number (default: 0)
- `size` (optional): Number of items per page (default: 10)

**Example Request:**
```
GET http://localhost:8080/api/products/category/Electronics?page=0&size=5
```

### 4. Get Products by Brand
**GET** `/api/products/brand/{brand}`

Retrieves products filtered by brand with pagination.

**Path Parameters:**
- `brand`: Product brand (string)

**Query Parameters:**
- `page` (optional): Page number (default: 0)
- `size` (optional): Number of items per page (default: 10)

**Example Request:**
```
GET http://localhost:8080/api/products/brand/TechCorp?page=0&size=5
```

### 5. Get Products by Department ID
**GET** `/api/products/department/{departmentId}`

Retrieves products filtered by department ID with pagination.

**Path Parameters:**
- `departmentId`: Department ID (integer)

**Query Parameters:**
- `page` (optional): Page number (default: 0)
- `size` (optional): Number of items per page (default: 10)

**Example Request:**
```
GET http://localhost:8080/api/products/department/1?page=0&size=5
```

### 6. Get Products by Department Name
**GET** `/api/products/department/name/{departmentName}`

Retrieves products filtered by department name with pagination.

**Path Parameters:**
- `departmentName`: Department name (string)

**Query Parameters:**
- `page` (optional): Page number (default: 0)
- `size` (optional): Number of items per page (default: 10)

**Example Request:**
```
GET http://localhost:8080/api/products/department/name/Electronics?page=0&size=5
```

### 7. Search Products by Name
**GET** `/api/products/search`

Searches products by name (case-insensitive) with pagination.

**Query Parameters:**
- `name`: Search term (required)
- `page` (optional): Page number (default: 0)
- `size` (optional): Number of items per page (default: 10)

**Example Request:**
```
GET http://localhost:8080/api/products/search?name=phone&page=0&size=5
```

## Department Endpoints

### 1. Get All Departments
**GET** `/api/departments`

Retrieves all departments.

**Example Request:**
```
GET http://localhost:8080/api/departments
```

**Example Response:**
```json
[
  {
    "id": 1,
    "name": "Electronics",
    "description": null
  },
  {
    "id": 2,
    "name": "Clothing",
    "description": null
  }
]
```

### 2. Get Department by ID
**GET** `/api/departments/{id}`

Retrieves a specific department by its ID.

**Path Parameters:**
- `id`: Department ID (integer)

**Example Request:**
```
GET http://localhost:8080/api/departments/1
```

### 3. Get Department by Name
**GET** `/api/departments/name/{name}`

Retrieves a specific department by its name.

**Path Parameters:**
- `name`: Department name (string)

**Example Request:**
```
GET http://localhost:8080/api/departments/name/Electronics
```

## HTTP Status Codes

- **200 OK**: Request successful
- **400 Bad Request**: Invalid parameters or request format
- **404 Not Found**: Product or department not found
- **500 Internal Server Error**: Server error

## Error Response Format

All error responses follow this format:
```json
{
  "error": "Error type",
  "message": "Detailed error message"
}
```

## CORS Support

The API includes CORS headers to support frontend integration. All endpoints are accessible from any origin.

## Testing the API

You can test the API using:
- **Postman**: Import the endpoints and test with different parameters
- **cURL**: Use command line tools
- **Browser**: Direct URL access for GET requests

### Example cURL commands:

```bash
# Get all products
curl -X GET "http://localhost:8080/api/products"

# Get product by ID
curl -X GET "http://localhost:8080/api/products/1"

# Search products
curl -X GET "http://localhost:8080/api/products/search?name=phone"

# Get products by category
curl -X GET "http://localhost:8080/api/products/category/Electronics"

# Get products by department name
curl -X GET "http://localhost:8080/api/products/department/name/Electronics"

# Get all departments
curl -X GET "http://localhost:8080/api/departments"

# Get department by ID
curl -X GET "http://localhost:8080/api/departments/1"
```

## Database Schema (After Refactoring)

The API connects to the `ecommerce_db` database with the following table structure:

### Products Table:
- `id`: Primary key (Integer)
- `cost`: Product cost (Decimal)
- `category`: Product category (String)
- `name`: Product name (Text)
- `brand`: Product brand (String)
- `retail_price`: Retail price (Decimal)
- `department_id`: Foreign key to departments (Integer)
- `sku`: Stock keeping unit (String)
- `distribution_center_id`: Foreign key to distribution centers (Integer)

### Departments Table:
- `id`: Primary key (Integer)
- `name`: Department name (String, Unique)
- `description`: Department description (Text)

### Distribution Centers Table:
- `id`: Primary key (Integer)
- `name`: Center name (String)
- `latitude`: Latitude coordinate (Decimal)
- `longitude`: Longitude coordinate (Decimal)

## Database Relationships

- **Products** → **Departments**: Many-to-One (via `department_id`)
- **Products** → **Distribution Centers**: Many-to-One (via `distribution_center_id`)

## Migration Notes

The database has been refactored to:
1. ✅ Create a separate `departments` table
2. ✅ Extract unique department names from products
3. ✅ Populate the departments table
4. ✅ Update products to reference departments via foreign key
5. ✅ Update API to include department information 