import type { Recipe } from "../types";
import RecipeList from "../components/RecipeList/RecipeList";
import { useAuth } from "../contexts/AuthContext";

type Props = {
  recipes: Recipe[];
  onToggleFavorite: (id: string) => void;
};

function FavoritesPage({ recipes, onToggleFavorite }: Props) {
  const { currentUser } = useAuth();

  const userId = currentUser?._id;

  const favorited = userId
    ? recipes.filter((recipe) => recipe.likes.includes(userId))
    : [];

  return (
    <div className="app__container">
      <h1 className="app__heading">Favoritos</h1>

      {favorited.length === 0 ? (
        <p>Aún no tienes recetas en favoritos</p>
      ) : (
        <RecipeList
          recipes={favorited}
          onToggleFavorite={onToggleFavorite}
        />
      )}
    </div>
  );
}

export default FavoritesPage;