import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LandingPage from './components/pages/LandingPage';
import CameraPage from './components/pages/CameraPage';
import IngredientsPage from './components/pages/IngredientsPage';
import RecipesPage from './components/pages/RecipesPage';
import RecipeDetailPage from './components/pages/RecipeDetailPage';
import FavoritesPage from './components/pages/FavoritesPage';
import NotFoundPage from './components/pages/NotFoundPage';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/camera" element={<CameraPage />} />
            <Route path="/ingredients" element={<IngredientsPage />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/recipe/:id" element={<RecipeDetailPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;