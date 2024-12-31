import { useState } from "react";
import type { RecipeResponse } from "../lib/utils/types";
import Recipe from "./Recipe";
import RecipeSettings from "./RecipeSettings";
import { type ObjectId } from "mongoose";

interface RecipeListProps {
  recipes: RecipeResponse[];
}

export default function RecipeList({ recipes }: RecipeListProps) {

  const [selectedRecipeIds, setSelectedRecipeIds] = useState<ObjectId[]>([]);

  return (
    <div className="flex flex-col justify-center w-1/2 m-auto text-center text-white">
      <RecipeSettings recipeIds={selectedRecipeIds}/>
      <div className="flex flex-row justify-center *:border-[1px] *:bg-blue-950 *:w-1/5 mr-[30px]">
        <h2 className="rounded-tl-xl">Title</h2>
        <h2>Ingredients</h2>
        <h2>Instructions</h2>
        <h2>External link</h2>
        <h2 className="rounded-tr-xl">Date created</h2>
      </div>
      {recipes && recipes.map((r, index) => <Recipe key={index} recipe={r} selectedRecipeIds={selectedRecipeIds} setSelectedRecipeIds={setSelectedRecipeIds}/>)}
    </div>
  );
}
