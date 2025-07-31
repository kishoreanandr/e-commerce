import mysql.connector
from config import DB_CONFIG

def check_database_structure():
    """Check the current database structure"""
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        cursor = conn.cursor()
        
        print("🔍 Checking Database Structure")
        print("=" * 40)
        
        # Check if departments table exists
        cursor.execute("SHOW TABLES LIKE 'departments'")
        dept_table_exists = cursor.fetchone()
        print(f"📋 Departments table exists: {dept_table_exists is not None}")
        
        # Check products table structure
        cursor.execute("DESCRIBE products")
        products_columns = cursor.fetchall()
        print("\n📋 Products table structure:")
        for column in products_columns:
            print(f"  - {column[0]}: {column[1]}")
        
        # Check if department_id column exists
        department_id_exists = any(col[0] == 'department_id' for col in products_columns)
        print(f"\n🔍 department_id column exists: {department_id_exists}")
        
        # Check if department column exists
        department_exists = any(col[0] == 'department' for col in products_columns)
        print(f"🔍 department column exists: {department_exists}")
        
        # Sample data from products
        cursor.execute("SELECT * FROM products LIMIT 1")
        sample_product = cursor.fetchone()
        if sample_product:
            print(f"\n📋 Sample product data:")
            cursor.execute("SHOW COLUMNS FROM products")
            columns = [col[0] for col in cursor.fetchall()]
            for i, col in enumerate(columns):
                print(f"  - {col}: {sample_product[i]}")
        
        # Check foreign keys
        cursor.execute("""
            SELECT 
                CONSTRAINT_NAME,
                COLUMN_NAME,
                REFERENCED_TABLE_NAME,
                REFERENCED_COLUMN_NAME
            FROM information_schema.KEY_COLUMN_USAGE 
            WHERE TABLE_SCHEMA = %s 
            AND TABLE_NAME = 'products'
            AND REFERENCED_TABLE_NAME IS NOT NULL
        """, (DB_CONFIG['database'],))
        
        foreign_keys = cursor.fetchall()
        print(f"\n🔗 Foreign keys in products table:")
        for fk in foreign_keys:
            print(f"  - {fk[1]} -> {fk[2]}.{fk[3]}")
        
        conn.close()
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    check_database_structure() 