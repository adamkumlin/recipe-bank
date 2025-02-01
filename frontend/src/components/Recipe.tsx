import type { ObjectId } from "mongoose";
import type { RecipeResponse } from "../lib/utils/types";

interface Props {
  recipe: RecipeResponse;
  setSelectedRecipeIds: React.Dispatch<React.SetStateAction<ObjectId[]>>;
  selectedRecipeIds: ObjectId[];
}

export default function Recipe({ recipe, setSelectedRecipeIds, selectedRecipeIds }: Props) {
  const createdDate = recipe.dateCreated.split(" ").shift();
  const createdTime = recipe.dateCreated.split(" ").pop();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const isChecked: boolean = e.target.checked;
    const idIsAlreadyPresent: boolean = selectedRecipeIds.find(id => id === recipe._id) ? true : false;
    const recipeIds = selectedRecipeIds;

    if (isChecked && !idIsAlreadyPresent) {
      recipeIds.push(recipe._id);
    } else {
      const existingRecipeId = recipeIds.findIndex(id => id === recipe._id);
      recipeIds.splice(existingRecipeId, 1);
    }
    setSelectedRecipeIds(recipeIds);
  }

  return (
    <div className="flex flex-row">
      <div
        className="group/recipe flex flex-1 flex-row justify-left *:w-1/5 *:bg-slate-800 *:border-[1px] cursor-pointer"
        onClick={() => window.location.href = `/my-account/recipes/${recipe._id}`}
      >
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
        {recipe.link ? (
          <a
            className="underline text-blue-600 group-hover/recipe:bg-gray-600 hover:text-blue-800 visited:text-purple-600"
            href={recipe.link}
          >
            Link
          </a>
        ) : (
          <span className="group-hover/recipe:bg-gray-600">Link missing</span>
        )}
        <div className="group/date relative inline-block cursor-help md:mt-0 group-hover/recipe:bg-gray-600">
          <span className="border-b-2 border-dotted">{createdDate}</span>
          <span className="invisible absolute bottom-full left-1/2 w-fit text-nowrap rounded bg-black text-red-500 group-hover/date:visible">
            {createdTime}
          </span>
        </div>
      </div>
      <div>
        <input className="w-[20px] h-[20px] inline-block align-middle ml-[10px]" onChange={(e) => handleChange(e)} type="checkbox" />
      </div>
    </div>
  );
}
