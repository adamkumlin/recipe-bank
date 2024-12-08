import Recipe from "../components/Recipe";
import fetchApi from "../lib/utils/api";
import { RecipeResponse } from "../lib/utils/types";

export default async function MyRecipes() {
  
    const recipes: RecipeResponse[] = await fetchApi("/recipe/all/");

    return (
      <div className="w-1/2 m-auto text-center">
        <div className="grid grid-cols-3">
            <h2>Title</h2>
            <h2>Body</h2>
            <h2>Created</h2>
        </div>
        {recipes.map((recipe) => (
            <Recipe key={recipe._id} recipe={recipe}/>
        ))}
      </div>
    );
  }
  