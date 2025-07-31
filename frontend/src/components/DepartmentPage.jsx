import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import apiService from '../services/api';
import LoadingSpinner from './LoadingSpinner';

const DepartmentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize] = useState(12);

  useEffect(() => {
    fetchDepartmentProducts();
  }, [id, currentPage]);

  const fetchDepartmentProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get department details
      const departmentResponse = await apiService.getDepartmentById(id);
      setDepartment(departmentResponse);
      
      // Get products for this department
      const productsResponse = await apiService.getProductsByDepartmentId(id, currentPage, pageSize);
      setProducts(productsResponse.products || []);
      setTotalPages(productsResponse.totalPages || 0);
      setTotalItems(productsResponse.totalElements || 0);
    } catch (err) {
      setError('Failed to load department products. Please try again later.');
      console.error('Error fetching department products:', err);
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
        <div className="d-flex gap-2">
          <button className="btn btn-outline-danger" onClick={fetchDepartmentProducts}>
            Try Again
          </button>
          <Link to="/departments" className="btn btn-outline-secondary">
            Back to Departments
          </Link>
        </div>
      </div>
    );
  }

  if (!department) {
    return (
      <div className="text-center py-5">
        <h3>Department not found</h3>
        <p className="text-muted">The department you're looking for doesn't exist.</p>
        <Link to="/departments" className="btn btn-primary">
          Back to Departments
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Breadcrumb Navigation */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Products</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/departments">Departments</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {department.name}
          </li>
        </ol>
      </nav>

      {/* Department Header */}
      <div className="row mb-4">
        <div className="col">
          <div className="card bg-light">
            <div className="card-body text-center">
              <div className="department-header-icon mb-3">
                {getDepartmentIcon(department.name)}
              </div>
              <h2 className="card-title mb-2">{department.name}</h2>
              {department.description && (
                <p className="card-text text-muted mb-3">{department.description}</p>
              )}
              <div className="d-flex justify-content-center align-items-center gap-3">
                <span className="badge bg-primary fs-6">
                  {totalItems} Products
                </span>
                <span className="badge bg-secondary fs-6">
                  Page {currentPage + 1} of {totalPages}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-5">
          <h3>No products found</h3>
          <p className="text-muted">
            No products are currently available in the {department.name} department.
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
              Showing {products.length} of {totalItems} products in {department.name}
            </small>
          </div>
        </>
      )}

      {/* Navigation */}
      <div className="row mt-4">
        <div className="col text-center">
          <div className="d-flex justify-content-center gap-2">
            <Link to="/departments" className="btn btn-outline-secondary">
              ← Back to Departments
            </Link>
            <Link to="/" className="btn btn-outline-primary">
              View All Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get department icons
const getDepartmentIcon = (departmentName) => {
  const icons = {
    'Women': '👗',
    'Men': '👔',
    'Electronics': '📱',
    'Home': '🏠',
    'Sports': '⚽',
    'Beauty': '💄',
    'Kids': '🧸',
    'Books': '📚',
    'Automotive': '🚗',
    'Garden': '🌱',
    'default': '📦'
  };
  
  return icons[departmentName] || icons.default;
};

export default DepartmentPage; 