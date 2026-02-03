import React, { useState, useEffect } from 'react';
import './Navbar.css';
import Login from './Login';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  const handleLoginSuccess = (userName) => {
    setUser({ name: userName, email: userName });
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span className="logo-emoji">👩‍💻</span>
          Portfolio
        </div>
        
        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <button onClick={() => scrollToSection('hero')} className="nav-link">Home</button>
          <button onClick={() => scrollToSection('projects')} className="nav-link">Projects</button>
          <button onClick={() => scrollToSection('certificates')} className="nav-link">Certificates</button>
          <button onClick={() => scrollToSection('skills')} className="nav-link">Skills</button>
          <button onClick={() => scrollToSection('contact')} className="nav-link btn-contact">Contact</button>
        </div>

        <div className="navbar-auth">
          {user ? (
            <div className="user-profile">
              <span className="user-name">👤 {user.name}</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          ) : (
            <button onClick={() => setShowLogin(true)} className="login-btn">Login</button>
          )}
        </div>

        <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {showLogin && (
        <Login 
          onClose={() => setShowLogin(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </nav>
  );
}

export default Navbar;
