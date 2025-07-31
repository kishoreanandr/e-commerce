import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

// Components
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import DepartmentList from './components/DepartmentList';
import DepartmentPage from './components/DepartmentPage';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <Router>
      <div className="App">
        <ErrorBoundary>
          <Navbar />
          <main className="container-fluid">
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/departments" element={<DepartmentList />} />
              <Route path="/departments/:id" element={<DepartmentPage />} />
            </Routes>
          </main>
        </ErrorBoundary>
      </div>
    </Router>
  );
}

export default App;
