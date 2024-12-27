import type { RecipeResponse } from "../lib/utils/types";
import Recipe from "./Recipe";

interface RecipeListProps {
    recipes: RecipeResponse[];
}

export default function RecipeList({recipes}: RecipeListProps) {

    return (
        <div className="flex flex-col justify-center text-white font-['Lilita_One']">
        <div className="flex flex-row justify-center *:border-[1px] *:px-5">
            <h2>Title</h2>
            <h2>Ingredients</h2>
            <h2>Instructions</h2>
            <h2>Link</h2>
            <h2>Date created</h2>
        </div>
        {recipes && recipes.map((r, index) => <Recipe key={index} recipe={r}/>)}
        </div>
    )
}