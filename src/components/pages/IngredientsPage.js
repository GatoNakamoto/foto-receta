import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Asegurarse de que la ruta de importación sea correcta
import IngredientesDetalles from '../common/IngredientesDetalles';

const IngredientsPage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState('');
  const [capturedImage, setCapturedImage] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();
  
  // Cargar ingredientes detectados del localStorage
  useEffect(() => {
    const storedIngredients = localStorage.getItem('detectedIngredients');
    const storedImage = localStorage.getItem('capturedImage');
    
    if (storedIngredients) {
      setIngredients(JSON.parse(storedIngredients));
    } else {
      navigate('/camera');
    }
    
    if (storedImage) {
      setCapturedImage(storedImage);
    }
  }, [navigate]);
  
  // Eliminar un ingrediente
  const removeIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
    localStorage.setItem('detectedIngredients', JSON.stringify(updatedIngredients));
  };
  
  // Añadir un nuevo ingrediente
  const addIngredient = (e) => {
    e.preventDefault();
    if (newIngredient.trim() !== '') {
      const updatedIngredients = [...ingredients, newIngredient.trim().toLowerCase()];
      setIngredients(updatedIngredients);
      localStorage.setItem('detectedIngredients', JSON.stringify(updatedIngredients));
      setNewIngredient('');
    }
  };
  
  // Ir a la página de recetas
  const goToRecipes = () => {
    if (ingredients.length > 0) {
      navigate('/recipes');
    }
  };

  // Alternar visualización de detalles de confianza
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  
  return (
    <div className="container">
      <div className="ingredients-editor">
        <h2 className="text-center mb-3">Tus ingredientes</h2>
        
        <div className="row mb-3">
          <div className="col-md-6 mb-3">
            {capturedImage && (
              <img 
                src={capturedImage} 
                alt="Imagen capturada" 
                style={{ 
                  width: '100%', 
                  maxHeight: '200px', 
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
            )}
          </div>
          
          <div className="col-md-6">
            <p>Hemos detectado los siguientes ingredientes. Puedes editarlos o añadir más.</p>
            <button 
              className="btn btn-outline mb-2" 
              onClick={toggleDetails}
              style={{fontSize: '0.9rem'}}
            >
              {showDetails ? 'Ocultar detalles' : 'Mostrar detalles de confianza'}
            </button>
          </div>
        </div>
        
        {/* Mostrar detalles de confianza si está activado */}
        {showDetails && (
          <div className="mb-3">
            <IngredientesDetalles />
          </div>
        )}
        
        <div className="card">
          <h3 className="mb-2">Ingredientes detectados:</h3>
          
          <ul className="ingredients-list">
            {ingredients.length > 0 ? (
              ingredients.map((ingredient, index) => (
                <li key={index} className="ingredient-item">
                  <span>{ingredient}</span>
                  <button 
                    className="delete-btn" 
                    onClick={() => removeIngredient(index)}
                  >
                    ×
                  </button>
                </li>
              ))
            ) : (
              <li>No se han detectado ingredientes. Por favor, añade algunos manualmente.</li>
            )}
          </ul>
          
          <form onSubmit={addIngredient} className="mt-3">
            <div className="form-group">
              <label htmlFor="newIngredient">Añadir ingrediente:</label>
              <div style={{ display: 'flex' }}>
                <input
                  type="text"
                  id="newIngredient"
                  className="form-control"
                  value={newIngredient}
                  onChange={(e) => setNewIngredient(e.target.value)}
                  placeholder="Ej: tomate, queso, harina..."
                />
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{ marginLeft: '10px' }}
                >
                  Añadir
                </button>
              </div>
            </div>
          </form>
        </div>
        
        <div className="text-center mt-3">
          <button 
            className="btn btn-primary btn-large" 
            onClick={goToRecipes}
            disabled={ingredients.length === 0}
          >
            Buscar recetas
          </button>
        </div>
      </div>
    </div>
  );
};

export default IngredientsPage;