import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import LoadingSpinner from './LoadingSpinner';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const productData = await apiService.getProductById(id);
      setProduct(productData);
    } catch (err) {
      setError('Failed to load product details. Please try again later.');
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const calculateProfit = () => {
    if (product?.retailPrice && product?.cost) {
      return product.retailPrice - product.cost;
    }
    return null;
  };

  const calculateProfitMargin = () => {
    if (product?.retailPrice && product?.cost) {
      return ((product.retailPrice - product.cost) / product.retailPrice * 100).toFixed(2);
    }
    return null;
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
          <button className="btn btn-outline-danger" onClick={fetchProduct}>
            Try Again
          </button>
          <Link to="/" className="btn btn-outline-secondary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-5">
        <h3>Product not found</h3>
        <p className="text-muted">The product you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn-primary">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Products</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="row">
        {/* Product Image Placeholder */}
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body text-center">
              <div 
                className="bg-light rounded d-flex align-items-center justify-content-center"
                style={{ height: '300px' }}
              >
                <div className="text-muted">
                  <h4>📦</h4>
                  <p>Product Image</p>
                  <small>Image placeholder</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title mb-3">{product.name}</h2>
              
              {/* Price Section */}
              <div className="mb-4">
                <h3 className="text-primary mb-2">
                  {formatPrice(product.retailPrice)}
                </h3>
                {product.cost && (
                  <p className="text-muted mb-0">
                    <small>Cost: {formatPrice(product.cost)}</small>
                  </p>
                )}
              </div>

              {/* Product Information Grid */}
              <div className="row mb-4">
                <div className="col-sm-6">
                  <h6 className="text-muted">Brand</h6>
                  <p className="mb-3">{product.brand || 'N/A'}</p>
                </div>
                <div className="col-sm-6">
                  <h6 className="text-muted">Category</h6>
                  <p className="mb-3">{product.category || 'N/A'}</p>
                </div>
                <div className="col-sm-6">
                  <h6 className="text-muted">Department</h6>
                  <p className="mb-3">{product.department || 'N/A'}</p>
                </div>
                <div className="col-sm-6">
                  <h6 className="text-muted">SKU</h6>
                  <p className="mb-3">{product.sku || 'N/A'}</p>
                </div>
                {product.distributionCenterId && (
                  <div className="col-sm-6">
                    <h6 className="text-muted">Distribution Center</h6>
                    <p className="mb-3">ID: {product.distributionCenterId}</p>
                  </div>
                )}
              </div>

              {/* Profit Analysis */}
              {product.cost && product.retailPrice && (
                <div className="alert alert-info">
                  <h6 className="alert-heading">Profit Analysis</h6>
                  <div className="row">
                    <div className="col-sm-6">
                      <strong>Profit:</strong> {formatPrice(calculateProfit())}
                    </div>
                    <div className="col-sm-6">
                      <strong>Profit Margin:</strong> {calculateProfitMargin()}%
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="d-flex gap-2 mt-4">
                <Link to="/" className="btn btn-outline-secondary">
                  ← Back to Products
                </Link>
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    // Simulate add to cart functionality
                    alert('Product added to cart! (Demo functionality)');
                  }}
                >
                  🛒 Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section (Placeholder) */}
      <div className="mt-5">
        <h4>Related Products</h4>
        <div className="alert alert-info">
          <p className="mb-0">
            This section would show related products from the same category or brand.
            <br />
            <small>Feature to be implemented in future iterations.</small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 