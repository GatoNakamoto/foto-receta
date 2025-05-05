import React from 'react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  
  // No mostrar el footer en la página de inicio
  if (location.pathname === '/') {
    return null;
  }

  return (
    <footer>
      <div className="container">
        <p>© {new Date().getFullYear()} FotoReceta - Toma una foto. Cocina lo que ves.</p>
      </div>
    </footer>
  );
};

export default Footer;