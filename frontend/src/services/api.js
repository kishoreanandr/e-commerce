const API_BASE_URL = 'http://localhost:8080/api';

class ApiService {
  async fetchWithTimeout(url, options = {}, timeout = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }

  // Product endpoints
  async getAllProducts(page = 0, size = 10) {
    try {
      const url = `${API_BASE_URL}/products?page=${page}&size=${size}`;
      return await this.fetchWithTimeout(url);
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const url = `${API_BASE_URL}/products/${id}`;
      return await this.fetchWithTimeout(url);
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  async searchProductsByName(name, page = 0, size = 10) {
    try {
      const url = `${API_BASE_URL}/products/search?name=${encodeURIComponent(name)}&page=${page}&size=${size}`;
      return await this.fetchWithTimeout(url);
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }

  async getProductsByCategory(category, page = 0, size = 10) {
    try {
      const url = `${API_BASE_URL}/products/category/${encodeURIComponent(category)}?page=${page}&size=${size}`;
      return await this.fetchWithTimeout(url);
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  }

  async getProductsByBrand(brand, page = 0, size = 10) {
    try {
      const url = `${API_BASE_URL}/products/brand/${encodeURIComponent(brand)}?page=${page}&size=${size}`;
      return await this.fetchWithTimeout(url);
    } catch (error) {
      console.error('Error fetching products by brand:', error);
      throw error;
    }
  }

  // Department endpoints
  async getAllDepartments() {
    try {
      const url = `${API_BASE_URL}/departments`;
      return await this.fetchWithTimeout(url);
    } catch (error) {
      console.error('Error fetching departments:', error);
      throw error;
    }
  }

  async getDepartmentById(id) {
    try {
      const url = `${API_BASE_URL}/departments/${id}`;
      return await this.fetchWithTimeout(url);
    } catch (error) {
      console.error('Error fetching department:', error);
      throw error;
    }
  }

  async getDepartmentByName(name) {
    try {
      const url = `${API_BASE_URL}/departments/name/${encodeURIComponent(name)}`;
      return await this.fetchWithTimeout(url);
    } catch (error) {
      console.error('Error fetching department by name:', error);
      throw error;
    }
  }

  async getProductsByDepartmentId(departmentId, page = 0, size = 10) {
    try {
      const url = `${API_BASE_URL}/departments/${departmentId}/products?page=${page}&size=${size}`;
      return await this.fetchWithTimeout(url);
    } catch (error) {
      console.error('Error fetching products by department:', error);
      throw error;
    }
  }

  async getProductsByDepartmentName(departmentName, page = 0, size = 10) {
    try {
      const url = `${API_BASE_URL}/products/department/name/${encodeURIComponent(departmentName)}?page=${page}&size=${size}`;
      return await this.fetchWithTimeout(url);
    } catch (error) {
      console.error('Error fetching products by department name:', error);
      throw error;
    }
  }
}

export default new ApiService(); 