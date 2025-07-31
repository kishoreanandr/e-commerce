import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api';
import LoadingSpinner from './LoadingSpinner';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize] = useState(12);

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.getAllProducts(currentPage, pageSize);
      setProducts(response.products || []);
      setTotalPages(response.totalPages || 0);
      setTotalItems(response.totalItems || 0);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setCurrentPage(0);
      fetchProducts();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.searchProductsByName(searchTerm, currentPage, pageSize);
      setProducts(response.products || []);
      setTotalPages(response.totalPages || 0);
      setTotalItems(response.totalItems || 0);
    } catch (err) {
      setError('Failed to search products. Please try again.');
      console.error('Error searching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Error!</h4>
        <p>{error}</p>
        <hr />
        <button className="btn btn-outline-danger" onClick={fetchProducts}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Search Bar */}
      <div className="row mb-4">
        <div className="col-md-8 mx-auto">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search products by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleSearch}
            >
              🔍 Search
            </button>
            {searchTerm && (
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setCurrentPage(0);
                  fetchProducts();
                }}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-5">
          <h3>No products found</h3>
          <p className="text-muted">
            {searchTerm ? 'Try a different search term.' : 'No products available.'}
          </p>
        </div>
      ) : (
        <>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
            {products.map((product) => (
              <div key={product.id} className="col">
                <div className="card h-100 shadow-sm">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-truncate" title={product.name}>
                      {product.name}
                    </h5>
                    <p className="card-text text-muted mb-2">
                      <small>Brand: {product.brand || 'N/A'}</small>
                    </p>
                    <p className="card-text text-muted mb-2">
                      <small>Category: {product.category || 'N/A'}</small>
                    </p>
                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="h5 text-primary mb-0">
                          {formatPrice(product.retailPrice)}
                        </span>
                        {product.cost && (
                          <small className="text-muted">
                            Cost: {formatPrice(product.cost)}
                          </small>
                        )}
                      </div>
                      <Link
                        to={`/product/${product.id}`}
                        className="btn btn-outline-primary btn-sm w-100"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="mt-4">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                  >
                    Previous
                  </button>
                </li>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = Math.max(0, Math.min(totalPages - 1, currentPage - 2 + i));
                  return (
                    <li key={pageNum} className={`page-item ${pageNum === currentPage ? 'active' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum + 1}
                      </button>
                    </li>
                  );
                })}
                
                <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages - 1}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}

          {/* Results Info */}
          <div className="text-center mt-3">
            <small className="text-muted">
              Showing {products.length} of {totalItems} products
              {searchTerm && ` for "${searchTerm}"`}
            </small>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList; 