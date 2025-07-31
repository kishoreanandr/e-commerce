const API_BASE_URL = 'http://localhost:8080/api/products';

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

  async getAllProducts(page = 0, size = 10) {
    try {
      const url = `${API_BASE_URL}?page=${page}&size=${size}`;
      return await this.fetchWithTimeout(url);
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const url = `${API_BASE_URL}/${id}`;
      return await this.fetchWithTimeout(url);
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  async searchProductsByName(name, page = 0, size = 10) {
    try {
      const url = `${API_BASE_URL}/search?name=${encodeURIComponent(name)}&page=${page}&size=${size}`;
      return await this.fetchWithTimeout(url);
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }

  async getProductsByCategory(category, page = 0, size = 10) {
    try {
      const url = `${API_BASE_URL}/category/${encodeURIComponent(category)}?page=${page}&size=${size}`;
      return await this.fetchWithTimeout(url);
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  }

  async getProductsByBrand(brand, page = 0, size = 10) {
    try {
      const url = `${API_BASE_URL}/brand/${encodeURIComponent(brand)}?page=${page}&size=${size}`;
      return await this.fetchWithTimeout(url);
    } catch (error) {
      console.error('Error fetching products by brand:', error);
      throw error;
    }
  }
}

export default new ApiService(); 