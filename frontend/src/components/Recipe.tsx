import type { RecipeResponse } from "../lib/utils/types";

interface RecipeProps {
    recipe: RecipeResponse;
}

export default function Recipe({recipe}: RecipeProps) {

    return (
        <div className="grid grid-cols-3 text-center *:border-r-[1px] border-[1px] border-black *:border-r-black">
            <h2>{recipe.title}</h2>
            <p>{recipe.body}</p>
            <p>Created {recipe.dateCreated}</p>
        </div>
    )
}