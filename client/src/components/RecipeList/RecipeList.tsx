import type { Recipe } from "../../types";
import RecipeCard from "../RecipeCard/RecipeCard";
import "./RecipeList.css";

type Props = {
  recipes: Recipe[];
  onRecipeUpdate: (recipe: Recipe) => void;
};

function RecipeList({ recipes, onRecipeUpdate }: Props) {
  return (
    <ul className="recipe-list">
      {recipes.map((recipe) => (
        <li key={recipe.id} className="recipe-list__item">
          <RecipeCard
            recipe={recipe}
            onRecipeUpdate={onRecipeUpdate}
          />
        </li>
      ))}
    </ul>
  );
}

export default RecipeList;