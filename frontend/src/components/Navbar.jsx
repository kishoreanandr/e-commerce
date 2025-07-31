import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          🛍️ E-Commerce Store
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                🏠 All Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/departments">
                🏪 Departments
              </Link>
            </li>
          </ul>
          
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={(e) => e.preventDefault()}>
                🛒 Cart (0)
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={(e) => e.preventDefault()}>
                👤 Account
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 