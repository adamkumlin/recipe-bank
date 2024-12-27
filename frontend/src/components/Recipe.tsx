import type { RecipeResponse } from "../lib/utils/types";

interface RecipeProps {
    recipe: RecipeResponse;
}

export default function Recipe({recipe}: RecipeProps) {

    return (
        <div className="flex flex-row justify-center gap-2 text-white ">
            <h2>{recipe.title}</h2>
            {/* <p>{recipe.body}</p> */}
            {/* <p>Created {recipe.dateCreated}</p> */}
        </div>
    )
}