import { useState } from "react";

import type { Recipe } from "../types";
import RecipeList from "../components/RecipeList/RecipeList";

type Props = {
  recipes: Recipe[];
  onRecipeUpdate: (recipe: Recipe) => void;
};

function HomePage({ recipes, onRecipeUpdate }: Props) {
  const [query, setQuery] = useState("");

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="app__container">
      <input
        className="app__search"
        type="search"
        placeholder="Filtrar recetas..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <h1 className="app__heading">Recetas</h1>

      <RecipeList
        recipes={filteredRecipes}
        onRecipeUpdate={onRecipeUpdate}
      />
    </div>
  );
}

export default HomePage;