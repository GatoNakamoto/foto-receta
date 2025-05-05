import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="container text-center" style={{ padding: '50px 20px' }}>
      <h1 style={{ fontSize: '4rem', color: '#FF6600', marginBottom: '20px' }}>404</h1>
      <h2 className="mb-3">Página no encontrada</h2>
      <p className="mb-3">Lo sentimos, la página que estás buscando no existe.</p>
      <Link to="/" className="btn btn-primary">
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFoundPage;