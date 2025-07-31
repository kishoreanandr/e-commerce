# Product REST API Documentation

## Overview
This REST API provides endpoints to manage and retrieve product information from the ecommerce database.

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
      "department": "Electronics",
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
  "department": "Electronics",
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

### 5. Search Products by Name
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

## HTTP Status Codes

- **200 OK**: Request successful
- **400 Bad Request**: Invalid parameters or request format
- **404 Not Found**: Product not found
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
```

## Database Schema

The API connects to the `ecommerce_db` database with the following product table structure:

- `id`: Primary key (Integer)
- `cost`: Product cost (Decimal)
- `category`: Product category (String)
- `name`: Product name (Text)
- `brand`: Product brand (String)
- `retail_price`: Retail price (Decimal)
- `department`: Department (String)
- `sku`: Stock keeping unit (String)
- `distribution_center_id`: Foreign key to distribution centers (Integer) 