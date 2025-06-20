import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CheckoutPage from './pages/CheckoutPage';
import Navbar from './components/navbar';
function App() {
  const token = localStorage.getItem('token');
  
  return (
    <Router>
    <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={token ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/checkout" element={token ? <CheckoutPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
