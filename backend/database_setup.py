import mysql.connector
import pandas as pd
import os
from pathlib import Path
from config import DB_CONFIG

def create_database():
    """Create MySQL database and tables"""
    # First connect without database to create it
    conn = mysql.connector.connect(
        host=DB_CONFIG['host'],
        port=DB_CONFIG['port'],
        user=DB_CONFIG['user'],
        password=DB_CONFIG['password']
    )
    cursor = conn.cursor()
    
    # Create database if it doesn't exist
    cursor.execute(f"CREATE DATABASE IF NOT EXISTS {DB_CONFIG['database']}")
    cursor.execute(f"USE {DB_CONFIG['database']}")
    
    # Create distribution_centers table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS distribution_centers (
            id INT PRIMARY KEY,
            name VARCHAR(255),
            latitude DECIMAL(10,6),
            longitude DECIMAL(10,6)
        )
    ''')
    
    # Create products table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS products (
            id INT PRIMARY KEY,
            cost DECIMAL(10,2),
            category VARCHAR(255),
            name TEXT,
            brand VARCHAR(255),
            retail_price DECIMAL(10,2),
            department VARCHAR(255),
            sku VARCHAR(255),
            distribution_center_id INT,
            FOREIGN KEY (distribution_center_id) REFERENCES distribution_centers(id)
        )
    ''')
    
    conn.commit()
    conn.close()
    
    # Now connect to the specific database
    conn = mysql.connector.connect(**DB_CONFIG)
    return conn

def load_distribution_centers(conn, csv_path):
    """Load distribution centers data from CSV"""
    print("Loading distribution centers...")
    df = pd.read_csv(csv_path)
    
    # Clear existing data - delete from child table first, then parent
    cursor = conn.cursor()
    cursor.execute("DELETE FROM products")  # Delete child table first
    cursor.execute("DELETE FROM distribution_centers")  # Then parent table
    
    # Insert data row by row for better control
    for _, row in df.iterrows():
        cursor.execute("""
            INSERT INTO distribution_centers (id, name, latitude, longitude)
            VALUES (%s, %s, %s, %s)
        """, (row['id'], row['name'], row['latitude'], row['longitude']))
    
    conn.commit()
    print(f"Loaded {len(df)} distribution centers")

def load_products(conn, csv_path):
    """Load products data from CSV"""
    print("Loading products...")
    df = pd.read_csv(csv_path)
    
    # Handle NaN values - replace with None for MySQL
    df = df.replace({pd.NA: None, pd.NaT: None})
    df = df.where(pd.notnull(df), None)
    
    # Clear existing data (products already cleared in load_distribution_centers)
    cursor = conn.cursor()
    
    # Insert data row by row for better control
    for _, row in df.iterrows():
        # Convert NaN values to None for MySQL
        values = []
        for col in ['id', 'cost', 'category', 'name', 'brand', 'retail_price', 'department', 'sku', 'distribution_center_id']:
            value = row[col]
            if pd.isna(value) or value == 'nan':
                values.append(None)
            else:
                values.append(value)
        
        cursor.execute("""
            INSERT INTO products (id, cost, category, name, brand, retail_price, department, sku, distribution_center_id)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, tuple(values))
    
    conn.commit()
    print(f"Loaded {len(df)} products")

def verify_data(conn):
    """Verify the data was loaded correctly"""
    print("\n=== Data Verification ===")
    
    # Check distribution centers
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM distribution_centers")
    dc_count = cursor.fetchone()[0]
    print(f"Distribution Centers: {dc_count} records")
    
    # Check products
    cursor.execute("SELECT COUNT(*) FROM products")
    products_count = cursor.fetchone()[0]
    print(f"Products: {products_count} records")
    
    # Sample queries
    print("\n=== Sample Data ===")
    
    # Sample distribution centers
    cursor.execute("SELECT * FROM distribution_centers LIMIT 3")
    print("Sample Distribution Centers:")
    for row in cursor.fetchall():
        print(f"  ID: {row[0]}, Name: {row[1]}, Lat: {row[2]}, Long: {row[3]}")
    
    # Sample products
    cursor.execute("SELECT id, name, brand, retail_price FROM products LIMIT 3")
    print("\nSample Products:")
    for row in cursor.fetchall():
        print(f"  ID: {row[0]}, Name: {row[1]}, Brand: {row[2]}, Price: ${row[3]}")
    
    # Check foreign key relationships
    cursor.execute("""
        SELECT COUNT(*) FROM products p 
        JOIN distribution_centers dc ON p.distribution_center_id = dc.id
    """)
    valid_relationships = cursor.fetchone()[0]
    print(f"\nValid product-distribution center relationships: {valid_relationships}")

def main():
    """Main function to set up database and load data"""
    print("=== Milestone 1: Database Setup and Data Loading ===")
    
    # Define file paths - go up one level since backend is in backend/ folder
    base_path = Path("../ecommerce-dataset-main/archive/archive")
    products_csv = base_path / "products.csv"
    distribution_centers_csv = base_path / "distribution_centers.csv"
    
    # Check if files exist
    if not products_csv.exists():
        print(f"Error: {products_csv} not found!")
        return
    
    if not distribution_centers_csv.exists():
        print(f"Error: {distribution_centers_csv} not found!")
        return
    
    # Create database and tables
    print("Creating database and tables...")
    conn = create_database()
    
    try:
        # Load data
        load_distribution_centers(conn, distribution_centers_csv)
        load_products(conn, products_csv)
        
        # Verify data
        verify_data(conn)
        
        print("\n=== Milestone 1 Complete! ===")
        print("Database setup and data loading completed successfully.")

        
    except Exception as e:
        print(f"Error: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    main() 