import React, { useState, useEffect } from 'react';

// Componente para mostrar los ingredientes detectados con su nivel de confianza
const IngredientesDetalles = () => {
  const [ingredientes, setIngredientes] = useState([]);
  
  useEffect(() => {
    // Cargar ingredientes con confianza desde localStorage
    const ingredientesConConfianza = localStorage.getItem('ingredientesConConfianza');
    
    if (ingredientesConConfianza) {
      try {
        const parsedIngredientes = JSON.parse(ingredientesConConfianza);
        setIngredientes(parsedIngredientes);
      } catch (error) {
        console.error('Error al parsear ingredientes:', error);
      }
    }
  }, []);
  
  // Función para formatear el porcentaje de confianza
  const formatConfianza = (valor) => {
    return (valor * 100).toFixed(1) + '%';
  };
  
  // Función para determinar el color basado en el valor de confianza
  const getConfianzaColor = (valor) => {
    if (valor >= 0.9) return '#4CAF50'; // Verde
    if (valor >= 0.75) return '#8BC34A'; // Verde claro
    if (valor >= 0.6) return '#FFC107'; // Amarillo
    return '#FF5722'; // Naranja
  };
  
  return (
    <div className="card">
      <h3>Ingredientes detectados:</h3>
      
      {ingredientes.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Ingrediente</th>
              <th style={{ textAlign: 'right', padding: '8px', borderBottom: '1px solid #ddd' }}>Confianza</th>
            </tr>
          </thead>
          <tbody>
            {ingredientes.map((ingrediente, index) => (
              <tr key={index}>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                  {ingrediente.nombre}
                </td>
                <td style={{ 
                  textAlign: 'right', 
                  padding: '8px', 
                  borderBottom: '1px solid #eee',
                  color: getConfianzaColor(ingrediente.confianza)
                }}>
                  {formatConfianza(ingrediente.confianza)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No se han detectado ingredientes.</p>
      )}
    </div>
  );
};

export default IngredientesDetalles;