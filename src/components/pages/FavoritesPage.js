import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import mockRecipes from '../../data/mock_recipes';

const FavoritesPage = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Cargar IDs de recetas favoritas del localStorage
    const favoriteIds = JSON.parse(localStorage.getItem('favorite_recipes') || '[]');
    
    // Buscar las recetas favoritas en el catálogo de recetas
    const favRecipes = mockRecipes.filter(recipe => favoriteIds.includes(recipe.id));
    
    // Obtener las valoraciones
    const recipesWithRatings = favRecipes.map(recipe => {
      const storedRating = localStorage.getItem(`recipe_rating_${recipe.id}`);
      const rating = storedRating ? parseInt(storedRating) : 0;
      
      return {
        ...recipe,
        rating
      };
    });
    
    setFavoriteRecipes(recipesWithRatings);
    setLoading(false);
  }, []);
  
  // Eliminar de favoritos
  const removeFromFavorites = (id) => {
    const favorites = JSON.parse(localStorage.getItem('favorite_recipes') || '[]');
    const newFavorites = favorites.filter(favId => favId !== id);
    
    localStorage.setItem('favorite_recipes', JSON.stringify(newFavorites));
    setFavoriteRecipes(favoriteRecipes.filter(recipe => recipe.id !== id));
  };
  
  return (
    <div className="container">
      <h2 className="text-center mb-3">Mis Recetas Favoritas</h2>
      
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : favoriteRecipes.length > 0 ? (
        <div className="recipes-grid">
          {favoriteRecipes.map(recipe => (
            <div key={recipe.id} className="recipe-card">
              <img src={recipe.image} alt={recipe.title} />
              <div className="recipe-card-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3>{recipe.title}</h3>
                  <button 
                    onClick={() => removeFromFavorites(recipe.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#FF6600',
                      cursor: 'pointer',
                      fontSize: '1.2rem',
                      fontWeight: 'bold'
                    }}
                  >
                    ×
                  </button>
                </div>
                
                <div className="stars-container">
                  {[1, 2, 3, 4, 5].map(star => (
                    <span 
                      key={star} 
                      className={`star ${recipe.rating >= star ? 'filled' : ''}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                
                <div className="mt-2">
                  <Link to={`/recipe/${recipe.id}`} className="btn btn-primary">
                    Ver receta
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center">
          <h3 className="mb-2">No tienes recetas favoritas</h3>
          <p>¿Por qué no pruebas a añadir algunas recetas a tus favoritos?</p>
          <Link to="/camera" className="btn btn-primary mt-2">
            Comenzar a buscar recetas
          </Link>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;