import { useNavigate } from "react-router-dom";

import type { Recipe } from "../../types";
import { categoryColors, categoryLabels } from "../../data/recipes";
import { useAuth } from "../../contexts/AuthContext";
import { toggleLike } from "../../utils/api";
import "./RecipeCard.css";

type Props = {
  recipe: Recipe;
  onRecipeUpdate: (recipe: Recipe) => void;
};

function RecipeCard({ recipe, onRecipeUpdate }: Props) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const userId = currentUser?._id;
  const isFavorited = userId ? recipe.likes.includes(userId) : false;

  async function handleToggleFavorite(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    event.stopPropagation();

    if (!userId) {
      navigate("/login");
      return;
    }

    try {
      const updatedRecipe = await toggleLike(recipe.id, userId);
      onRecipeUpdate(updatedRecipe);
    } catch (error) {
      console.error("No se pudo actualizar el favorito:", error);
    }
  }

  return (
    <article className="recipe-card">
      <button
        type="button"
        className="recipe-card__view"
        onClick={() => navigate(`/recipes/${recipe.id}`)}
        aria-label="Ver detalles de la receta"
      ></button>

      <button
        type="button"
        className="recipe-card__favorite"
        onClick={handleToggleFavorite}
        aria-label={
          isFavorited ? "Quitar de favoritos" : "Añadir a favoritos"
        }
      >
        {isFavorited ? "♥" : "♡"}
      </button>

      <span
        style={{
          backgroundColor: categoryColors[recipe.category],
        }}
        className="recipe-card__category"
      >
        {categoryLabels[recipe.category]}
      </span>

      <h2 className="recipe-card__title">{recipe.title}</h2>

      <p className="recipe-card__description">{recipe.description}</p>
    </article>
  );
}

export default RecipeCard;