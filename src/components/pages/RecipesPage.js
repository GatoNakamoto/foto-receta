import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import mockRecipes from '../../data/mock_recipes';

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Obtener ingredientes del localStorage
    const storedIngredients = localStorage.getItem('detectedIngredients');
    
    if (!storedIngredients) {
      navigate('/camera');
      return;
    }
    
    const parsedIngredients = JSON.parse(storedIngredients);
    setIngredients(parsedIngredients);
    
    // Filtrar recetas basadas en los ingredientes
    const filteredRecipes = filterRecipesByIngredients(parsedIngredients);
    setRecipes(filteredRecipes);
    setLoading(false);
  }, [navigate]);
  
  // Función para filtrar recetas según ingredientes disponibles
  const filterRecipesByIngredients = (availableIngredients) => {
    // Calcular un puntaje para cada receta basado en cuántos ingredientes coinciden
    const recipesWithScore = mockRecipes.map(recipe => {
      const matchingIngredients = recipe.ingredients.filter(ingredient => 
        availableIngredients.some(available => 
          available.toLowerCase().includes(ingredient.toLowerCase()) || 
          ingredient.toLowerCase().includes(available.toLowerCase())
        )
      );
      
      const matchPercentage = (matchingIngredients.length / recipe.ingredients.length) * 100;
      
      return {
        ...recipe,
        matchingIngredients,
        matchPercentage
      };
    });
    
    // Ordenar por porcentaje de coincidencia (de mayor a menor)
    return recipesWithScore
      .filter(recipe => recipe.matchPercentage > 0) // Solo recetas con al menos una coincidencia
      .sort((a, b) => b.matchPercentage - a.matchPercentage);
  };
  
  return (
    <div className="container">
      <h2 className="text-center mb-3">Recetas sugeridas</h2>
      
      <div className="mb-3">
        <h4>Ingredientes disponibles:</h4>
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '5px',
          marginBottom: '20px'
        }}>
          {ingredients.map((ingredient, index) => (
            <span 
              key={index}
              style={{
                background: '#FF6600',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '20px',
                fontSize: '0.9rem'
              }}
            >
              {ingredient}
            </span>
          ))}
        </div>
        
        <Link to="/ingredients" className="btn btn-outline">
          Editar ingredientes
        </Link>
      </div>
      
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : recipes.length > 0 ? (
        <div>
          <p className="mb-2">
            Hemos encontrado {recipes.length} recetas que puedes hacer con tus ingredientes:
          </p>
          
          <div className="recipes-grid">
            {recipes.map(recipe => (
              <div key={recipe.id} className="recipe-card">
                <img src={recipe.image} alt={recipe.title} />
                <div className="recipe-card-content">
                  <h3>{recipe.title}</h3>
                  <p>Coincidencia: {Math.round(recipe.matchPercentage)}%</p>
                  <p>
                    <small>
                      {recipe.matchingIngredients.length} de {recipe.ingredients.length} ingredientes
                    </small>
                  </p>
                  <div className="mt-2">
                    <Link to={`/recipe/${recipe.id}`} className="btn btn-primary">
                      Ver receta
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="card">
          <h3>No se encontraron recetas</h3>
          <p>No hemos encontrado recetas que coincidan con tus ingredientes. Intenta añadir más ingredientes.</p>
          <Link to="/ingredients" className="btn btn-primary mt-2">
            Editar ingredientes
          </Link>
        </div>
      )}
    </div>
  );
};

export default RecipesPage;