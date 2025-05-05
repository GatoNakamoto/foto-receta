import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="logo-container">
        <div style={{ 
          fontSize: '3rem', 
          fontWeight: 'bold', 
          color: '#FF6600',
          marginBottom: '20px'
        }}>
          FotoReceta
        </div>
      </div>
      
      <h1 className="landing-subtitle">
        "Toma una foto. Cocina lo que ves."
      </h1>
      
      <p className="mb-3">
        Convierte los ingredientes que tienes a mano en deliciosas recetas con solo una foto.
      </p>
      
      <Link to="/camera" className="btn btn-primary btn-large">
        Probar ahora
      </Link>
    </div>
  );
};

export default LandingPage;