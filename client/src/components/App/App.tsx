import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import type { Recipe } from "../../types";
import { getRecipes, toggleLike } from "../../utils/api";
import { useAuth } from "../../contexts/AuthContext";

import AppLayout from "../AppLayout/AppLayout";
import {
  ProtectedRoute,
  PublicRoute,
} from "../ProtectedRoute/ProtectedRoute";

import HomePage from "../../pages/HomePage";
import FavoritesPage from "../../pages/FavoritesPage";
import RecipePage from "../../pages/RecipePage";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import NotFoundPage from "../../pages/NotFoundPage";

import "./App.css";

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { currentUser } = useAuth();

  useEffect(() => {
    getRecipes()
      .then((data) => {
        setRecipes(data);
        setIsLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  function handleRecipeUpdate(updatedRecipe: Recipe) {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe,
      ),
    );
  }

  async function handleToggleFavorite(id: string) {
    if (!currentUser) {
      return;
    }

    try {
      const updatedRecipe = await toggleLike(id, currentUser._id);
      handleRecipeUpdate(updatedRecipe);
    } catch (err) {
      console.error("No se pudo actualizar el favorito:", err);
    }
  }

  function homeContent() {
    if (isLoading) {
      return <p className="app__loading">Cargando...</p>;
    }

    if (error) {
      return (
        <p className="app__message">
          No se pudieron cargar las recetas.
        </p>
      );
    }

    return (
      <HomePage
        recipes={recipes}
        onToggleFavorite={handleToggleFavorite}
      />
    );
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={homeContent()} />

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route
            path="/favorites"
            element={
              <FavoritesPage
                recipes={recipes}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />

          <Route
            path="/recipes/:id"
            element={<RecipePage recipes={recipes} />}
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;