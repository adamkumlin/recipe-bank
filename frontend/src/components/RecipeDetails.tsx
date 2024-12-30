import type { RecipeResponse } from "../lib/utils/types";

interface RecipeDetailsProps {
  recipe: RecipeResponse;
}

export default function RecipeDetails({ recipe }: RecipeDetailsProps) {
  if (!recipe) {
    return <div>Recipe not found.</div>;
  }

  return (
    <div className="flex flex-col justify-between h-5/6 w-1/2 m-auto">
      <h1 className="text-3xl">{recipe.title}</h1>
      <div className="flex flex-row justify-between gap-10">
        <div>
          <h2>Ingredients</h2>
          <ul className="list-disc list-inside group-hover/recipe:bg-gray-600">
            {recipe.ingredients.map((i, index) => (
              <li key={index}>{i}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Instructions</h2>
          <ol className="list-decimal list-inside group-hover/recipe:bg-gray-600">
            {recipe.instructions.map((i, index) => (
              <li key={index}>{i}</li>
            ))}
          </ol>
        </div>
      </div>
      <div>
        {recipe.link && (
          <>
            <a
              className="underline text-blue-600 group-hover/recipe:bg-gray-600 hover:text-blue-800 visited:text-purple-600"
              href={recipe.link}
            >
              Added
            </a>
            <span> at </span>
          </>
        )}
        <span>{recipe.dateCreated}</span>
      </div>
    </div>
  );
}
