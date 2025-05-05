import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  
  // No mostrar el header en la página de inicio
  if (location.pathname === '/') {
    return null;
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1 style={{ color: '#FF6600', fontSize: '1.5rem' }}>FotoReceta</h1>
        </Link>
        <nav>
          <Link to="/favorites" className="btn btn-outline">
            Favoritos
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;