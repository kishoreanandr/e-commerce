# Milestone 1: Database Design and Loading Data

This project implements the first milestone for the e-commerce dataset analysis using MySQL and Python virtual environment.

## Prerequisites

- Python 3.7 or higher
- MySQL Server installed and running
- pip (Python package installer)

## Setup Instructions

### Step 1: Create and Activate Virtual Environment
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### Step 2: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 3: Configure MySQL Database
1. Make sure MySQL Server is running
2. Update the `config.py` file with your MySQL credentials:
   ```python
   DB_CONFIG = {
       'host': 'localhost',
       'port': 3306,
       'user': 'root',
       'password': 'your_actual_password',  # Change this
       'database': 'ecommerce_db'
   }
   ```

### Step 4: Run the Database Setup Script
```bash
python database_setup.py
```

## What the Script Does

1. **Analyzes CSV Structure**: Examines the products.csv and distribution_centers.csv files
2. **Creates MySQL Database Schema**: 
   - `products` table with appropriate data types
   - `distribution_centers` table with location data
   - Foreign key relationship between products and distribution centers
3. **Loads Data**: Imports all CSV data into the MySQL database
4. **Verifies Data**: Runs queries to confirm data was loaded correctly

## Database Schema

### Products Table
- `id` (INT PRIMARY KEY)
- `cost` (DECIMAL(10,2))
- `category` (VARCHAR(255))
- `name` (TEXT)
- `brand` (VARCHAR(255))
- `retail_price` (DECIMAL(10,2))
- `department` (VARCHAR(255))
- `sku` (VARCHAR(255))
- `distribution_center_id` (INT, FOREIGN KEY)

### Distribution Centers Table
- `id` (INT PRIMARY KEY)
- `name` (VARCHAR(255))
- `latitude` (DECIMAL(10,6))
- `longitude` (DECIMAL(10,6))

## Expected Output

The script will:
- Create an `ecommerce_db` MySQL database
- Load all distribution centers and products data
- Display verification statistics
- Show sample data to confirm successful loading

## Troubleshooting

### MySQL Connection Issues
- Make sure MySQL Server is running
- Verify your credentials in `config.py`
- Check if MySQL is running on the default port (3306)

### Virtual Environment Issues
- Make sure you're in the correct directory
- Activate the virtual environment before installing packages
- If you get permission errors, try running as administrator

## Milestone Completion

Once the script runs successfully, you can inform Kiran that Milestone 1 is complete!

## Files Created

- `ecommerce_db` - MySQL database with loaded data
- `database_setup.py` - Main script for database setup
- `config.py` - Database configuration
- `requirements.txt` - Python dependencies
- `README.md` - This documentation 