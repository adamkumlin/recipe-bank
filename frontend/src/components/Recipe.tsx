import type { RecipeResponse } from "../lib/utils/types";

interface RecipeProps {
  recipe: RecipeResponse;
}

export default function Recipe({ recipe }: RecipeProps) {

  const createdDate = recipe.dateCreated.split(" ").shift();
  const createdTime = recipe.dateCreated.split(" ").pop();
  return (
    <a className="group/recipe flex flex-row justify-center *:w-1/12 *:border-[1px] cursor-pointer" href={`/my-account/recipes/${recipe._id}`}>
      <h2 className="group-hover/recipe:bg-gray-600">{recipe.title}</h2>
      <ul className="list-disc list-inside group-hover/recipe:bg-gray-600">
        {recipe.ingredients.map((i, index) => (
          <li key={index}>{i}</li>
        ))}
      </ul>
      <ol className="list-decimal list-inside group-hover/recipe:bg-gray-600">
        {recipe.instructions.map((i, index) => (
          <li key={index}>{i}</li>
        ))}
      </ol>
      {recipe.link ? <a className="underline text-blue-600 group-hover/recipe:bg-gray-600 hover:text-blue-800 visited:text-purple-600" href={recipe.link}>Link</a> : <span className="group-hover/recipe:bg-gray-600">Link missing</span>}
      <div className="group/date relative inline-block cursor-help md:mt-0 group-hover/recipe:bg-gray-600">
        <span className="border-b-2 border-dotted">{createdDate}</span>
        <span className="invisible absolute bottom-full left-1/2 w-fit text-nowrap rounded bg-black text-red-500 group-hover/date:visible">{createdTime}</span>
      </div>
    </a>
  );
}
