import type { RecipeResponse } from "../lib/utils/types";
import Recipe from "./Recipe";

interface RecipeListProps {
  recipes: RecipeResponse[];
}

export default function RecipeList({ recipes }: RecipeListProps) {
  return (
    <div className="flex flex-col justify-center text-center text-white">
      <div className="flex flex-row justify-center *:border-[1px] *:w-1/12">
        <h2 className="rounded-tl-xl">Title</h2>
        <h2>Ingredients</h2>
        <h2>Instructions</h2>
        <h2>External link</h2>
        <h2 className="rounded-tr-xl">Date created</h2>
      </div>
      {recipes && recipes.map((r, index) => <Recipe key={index} recipe={r} />)}
    </div>
  );
}
