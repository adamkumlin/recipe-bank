import { useState } from 'react';
import type { RecipeResponse } from '../lib/utils/types';
import Recipe from './Recipe';
import RecipeSettings from './RecipeSettings';
import { type ObjectId } from 'mongoose';
import cookingPot from '../assets/cooking-pot.svg';
interface Props {
  recipes: RecipeResponse[];
}

export default function RecipeList({ recipes }: Props) {
  const [selectedRecipeIds, setSelectedRecipeIds] = useState<ObjectId[]>([]);

  if (recipes && recipes.length > 0) {
    return (
      <div className="flex flex-col justify-center w-1/2 m-auto text-center text-white">
        <RecipeSettings recipeIds={selectedRecipeIds} />
        <div className="flex flex-row justify-center *:border-[1px] *:bg-blue-950 *:w-1/5 mr-[30px]">
          <h2 className="rounded-tl-xl">Title</h2>
          <h2>Ingredients</h2>
          <h2>Instructions</h2>
          <h2>External link</h2>
          <h2 className="rounded-tr-xl">Date created</h2>
        </div>
        {recipes.map((r, index) => (
          <Recipe
            key={index}
            recipe={r}
            selectedRecipeIds={selectedRecipeIds}
            setSelectedRecipeIds={setSelectedRecipeIds}
          />
        ))}
      </div>
    );
  } else {
    return (
      <div className="h-full w-1/2 m-auto justify-center flex flex-col gap-2">
        <img src={cookingPot.src} width={150} className="mx-auto" />
        <h2 className="text-2xl">No recipes yet.</h2>
        <a className="text-green-400" href="/new-recipe">
          Add one.
        </a>
      </div>
    );
  }
}
