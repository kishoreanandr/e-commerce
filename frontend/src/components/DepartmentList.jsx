import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import LoadingSpinner from './LoadingSpinner';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.getAllDepartments();
      setDepartments(response.departments || []);
    } catch (err) {
      setError('Failed to load departments. Please try again later.');
      console.error('Error fetching departments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDepartmentClick = (departmentId, departmentName) => {
    navigate(`/departments/${departmentId}`, { 
      state: { departmentName } 
    });
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
        <button className="btn btn-outline-danger" onClick={fetchDepartments}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="row mb-4">
        <div className="col">
          <h2 className="mb-3">🏪 Browse by Department</h2>
          <p className="text-muted">
            Explore our products organized by department. Click on any department to view its products.
          </p>
        </div>
      </div>

      {/* Departments Grid */}
      {departments.length === 0 ? (
        <div className="text-center py-5">
          <h3>No departments found</h3>
          <p className="text-muted">No departments are currently available.</p>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {departments.map((department) => (
            <div key={department.id} className="col">
              <div 
                className="card h-100 shadow-sm department-card"
                onClick={() => handleDepartmentClick(department.id, department.name)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-body d-flex flex-column">
                  <div className="text-center mb-3">
                    <div className="department-icon">
                      {getDepartmentIcon(department.name)}
                    </div>
                  </div>
                  
                  <h5 className="card-title text-center mb-2">
                    {department.name}
                  </h5>
                  
                  {department.description && (
                    <p className="card-text text-muted text-center mb-3">
                      <small>{department.description}</small>
                    </p>
                  )}
                  
                  <div className="mt-auto">
                    <div className="text-center">
                      <span className="badge bg-primary fs-6">
                        {department.productCount} Products
                      </span>
                    </div>
                    
                    <div className="text-center mt-2">
                      <small className="text-muted">
                        Click to browse products
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Navigation */}
      <div className="row mt-4">
        <div className="col text-center">
          <Link to="/" className="btn btn-outline-secondary">
            ← Back to All Products
          </Link>
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

export default DepartmentList; 