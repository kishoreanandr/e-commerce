import mysql.connector
import pandas as pd
from config import DB_CONFIG

def create_departments_table(conn):
    """Create the departments table"""
    cursor = conn.cursor()
    
    # Create departments table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS departments (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) UNIQUE NOT NULL,
            description TEXT
        )
    ''')
    
    conn.commit()
    print("✅ Departments table created successfully")

def extract_unique_departments(conn):
    """Extract unique department names from products table"""
    cursor = conn.cursor()
    
    # Get unique departments from products table
    cursor.execute('''
        SELECT DISTINCT department 
        FROM products 
        WHERE department IS NOT NULL AND department != ''
        ORDER BY department
    ''')
    
    departments = [row[0] for row in cursor.fetchall()]
    print(f"📊 Found {len(departments)} unique departments")
    return departments

def populate_departments_table(conn, departments):
    """Populate departments table with unique department names"""
    cursor = conn.cursor()
    
    for dept_name in departments:
        try:
            cursor.execute('''
                INSERT INTO departments (name) 
                VALUES (%s)
            ''', (dept_name,))
        except mysql.connector.IntegrityError:
            # Department already exists (due to UNIQUE constraint)
            pass
    
    conn.commit()
    print(f"✅ Populated departments table with {len(departments)} departments")

def add_department_id_column(conn):
    """Add department_id column to products table"""
    cursor = conn.cursor()
    
    try:
        # Add department_id column
        cursor.execute('''
            ALTER TABLE products 
            ADD COLUMN department_id INT
        ''')
        print("✅ Added department_id column to products table")
    except mysql.connector.Error as e:
        if "Duplicate column name" in str(e):
            print("ℹ️ department_id column already exists")
        else:
            raise e

def update_product_department_references(conn):
    """Update products table to reference departments via foreign key"""
    cursor = conn.cursor()
    
    # Update department_id based on department name
    cursor.execute('''
        UPDATE products p
        JOIN departments d ON p.department = d.name
        SET p.department_id = d.id
        WHERE p.department IS NOT NULL AND p.department != ''
    ''')
    
    updated_rows = cursor.rowcount
    conn.commit()
    print(f"✅ Updated {updated_rows} products with department references")

def add_foreign_key_constraint(conn):
    """Add foreign key constraint between products and departments"""
    cursor = conn.cursor()
    
    try:
        cursor.execute('''
            ALTER TABLE products 
            ADD CONSTRAINT fk_products_department 
            FOREIGN KEY (department_id) REFERENCES departments(id)
        ''')
        print("✅ Added foreign key constraint")
    except mysql.connector.Error as e:
        if "Duplicate key name" in str(e):
            print("ℹ️ Foreign key constraint already exists")
        else:
            raise e

def drop_old_department_column(conn):
    """Remove the old department column from products table"""
    cursor = conn.cursor()
    
    try:
        cursor.execute('''
            ALTER TABLE products 
            DROP COLUMN department
        ''')
        print("✅ Removed old department column from products table")
    except mysql.connector.Error as e:
        if "doesn't exist" in str(e):
            print("ℹ️ Old department column already removed")
        else:
            raise e

def verify_migration(conn):
    """Verify the migration was successful"""
    cursor = conn.cursor()
    
    # Check departments table
    cursor.execute("SELECT COUNT(*) FROM departments")
    dept_count = cursor.fetchone()[0]
    print(f"📊 Departments table has {dept_count} records")
    
    # Check products with department references
    cursor.execute("SELECT COUNT(*) FROM products WHERE department_id IS NOT NULL")
    products_with_dept = cursor.fetchone()[0]
    print(f"📊 Products with department references: {products_with_dept}")
    
    # Show sample departments
    cursor.execute("SELECT id, name FROM departments LIMIT 5")
    sample_depts = cursor.fetchall()
    print("📋 Sample departments:")
    for dept_id, dept_name in sample_depts:
        print(f"  - ID: {dept_id}, Name: {dept_name}")
    
    # Show sample products with department info
    cursor.execute('''
        SELECT p.id, p.name, d.name as dept_name 
        FROM products p 
        JOIN departments d ON p.department_id = d.id 
        LIMIT 3
    ''')
    sample_products = cursor.fetchall()
    print("📋 Sample products with departments:")
    for prod_id, prod_name, dept_name in sample_products:
        print(f"  - Product: {prod_name} (Dept: {dept_name})")

def main():
    """Main migration function"""
    print("🔄 Starting Database Migration - Milestone 4")
    print("=" * 50)
    
    try:
        # Connect to database
        conn = mysql.connector.connect(**DB_CONFIG)
        print("✅ Connected to database")
        
        # Step 1: Create departments table
        create_departments_table(conn)
        
        # Step 2: Extract unique departments
        departments = extract_unique_departments(conn)
        
        # Step 3: Populate departments table
        populate_departments_table(conn, departments)
        
        # Step 4: Add department_id column to products
        add_department_id_column(conn)
        
        # Step 5: Update product references
        update_product_department_references(conn)
        
        # Step 6: Add foreign key constraint
        add_foreign_key_constraint(conn)
        
        # Step 7: Remove old department column
        drop_old_department_column(conn)
        
        # Step 8: Verify migration
        print("\n🔍 Verifying migration...")
        verify_migration(conn)
        
        print("\n✅ Migration completed successfully!")
        print("🎉 Database refactoring for Milestone 4 is complete!")
        
    except Exception as e:
        print(f"❌ Migration failed: {e}")
        raise
    finally:
        if 'conn' in locals():
            conn.close()

if __name__ == "__main__":
    main() 