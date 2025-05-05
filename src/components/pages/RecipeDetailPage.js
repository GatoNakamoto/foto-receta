import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import mockRecipes from '../../data/mock_recipes';

const RecipeDetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userIngredients, setUserIngredients] = useState([]);
  
  useEffect(() => {
    // Buscar la receta por ID
    const foundRecipe = mockRecipes.find(r => r.id === parseInt(id));
    
    if (foundRecipe) {
      setRecipe(foundRecipe);
      
      // Cargar valoración del localStorage
      const storedRating = localStorage.getItem(`recipe_rating_${id}`);
      if (storedRating) {
        setRating(parseInt(storedRating));
      }
      
      // Comprobar si está en favoritos
      const favorites = JSON.parse(localStorage.getItem('favorite_recipes') || '[]');
      setIsFavorite(favorites.some(favId => favId === parseInt(id)));
      
      // Cargar ingredientes del usuario
      const ingredients = JSON.parse(localStorage.getItem('detectedIngredients') || '[]');
      setUserIngredients(ingredients);
    }
  }, [id]);
  
  // Guardar valoración
  const handleRating = (value) => {
    setRating(value);
    localStorage.setItem(`recipe_rating_${id}`, value.toString());
  };
  
  // Alternar favorito
  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorite_recipes') || '[]');
    
    if (isFavorite) {
      // Eliminar de favoritos
      const newFavorites = favorites.filter(favId => favId !== parseInt(id));
      localStorage.setItem('favorite_recipes', JSON.stringify(newFavorites));
      setIsFavorite(false);
    } else {
      // Añadir a favoritos
      const newFavorites = [...favorites, parseInt(id)];
      localStorage.setItem('favorite_recipes', JSON.stringify(newFavorites));
      setIsFavorite(true);
    }
  };
  
  // Comprobar si un ingrediente está disponible
  const isIngredientAvailable = (ingredient) => {
    return userIngredients.some(userIng => 
      userIng.toLowerCase().includes(ingredient.toLowerCase()) || 
      ingredient.toLowerCase().includes(userIng.toLowerCase())
    );
  };
  
  if (!recipe) {
    return (
      <div className="container text-center">
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container">
      <div className="recipe-detail">
        <Link to="/recipes" className="btn btn-outline mb-3">
          &larr; Volver a recetas
        </Link>
        
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="recipe-detail-img"
        />
        
        <div className="recipe-detail-header">
          <h1>{recipe.title}</h1>
          <button 
            className="btn" 
            onClick={toggleFavorite}
            style={{
              backgroundColor: isFavorite ? '#ff6600' : 'transparent',
              color: isFavorite ? 'white' : '#ff6600',
              border: '2px solid #ff6600',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem'
            }}
          >
            ♥
          </button>
        </div>
        
        <div className="card mb-3">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <span><strong>Tiempo:</strong> {recipe.time}</span>
            <span><strong>Dificultad:</strong> {recipe.difficulty}</span>
          </div>
          
          <p>{recipe.description}</p>
          
          <div className="stars-container">
            <p style={{ marginRight: '10px' }}>Tu valoración:</p>
            {[1, 2, 3, 4, 5].map(star => (
              <span 
                key={star} 
                className={`star ${rating >= star ? 'filled' : ''}`}
                onClick={() => handleRating(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        
        <div className="card mb-3">
          <h3 className="mb-2">Ingredientes:</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {recipe.ingredients.map((ingredient, index) => (
              <li 
                key={index}
                style={{
                  padding: '5px 0',
                  display: 'flex',
                  alignItems: 'center',
                  color: isIngredientAvailable(ingredient) ? 'black' : '#999'
                }}
              >
                <span 
                  style={{
                    marginRight: '10px',
                    color: isIngredientAvailable(ingredient) ? '#4CAF50' : '#999'
                  }}
                >
                  {isIngredientAvailable(ingredient) ? '✓' : '○'}
                </span>
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="card">
          <h3 className="mb-2">Preparación:</h3>
          <div className="recipe-instructions">
            <ol>
              {recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;