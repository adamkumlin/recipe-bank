import { type FormEvent, useState } from "react";
import { type PopupMenu, type Recipe } from "../lib/utils/types";
import { actions } from "astro:actions";
import Cookies from "js-cookie";
import NewRecipeFormPopup from "./NewRecipeFormPopup";
import { useTime } from "../hooks/useTime";
import InstructionsInput from "./InstructionsInput";

export default function NewRecipeForm() {
  const [formData, setFormData] = useState<Recipe>({
    title: "",
    ingredients: [],
    instructions: [],
    link: "",
    dateCreated: "",
  });
  const [error, setError] = useState<string>("");
  const [popupError, setPopupError] = useState<string>("");
  const [popupMenu, setPopupMenu] = useState<PopupMenu>({
    isActive: false,
    menuType: "",
  });

  function handleAddIngredient(newValue: string) {
    if (!newValue) {
      setPopupError("Ingredient cannot be empty.");
      return;
    }

    const ingredients: string[] = formData.ingredients;
    ingredients.push(newValue);
    setPopupMenu({ isActive: false, menuType: "" });
    setPopupError("");
  }

  function handleAddInstruction(newValue: string) {
    if (!newValue) {
      setPopupError("Instruction cannot be empty.");
      return;
    }

    const instructions: string[] = formData.instructions;
    instructions.push(newValue);
    setPopupMenu({ isActive: false, menuType: "" });
    setPopupError("");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const token = Cookies.get("token");

    if (!token) {
      setError("You are not logged in.");
      return;
    }

    if (
      !formData.title ||
      !formData.ingredients ||
      !formData.instructions ||
      !token
    ) {
      return;
    }

    const user = await actions.verifyUserJwt(token);

    if (!user) {
      return;
    }

    const time = await useTime();
    setFormData({ ...formData, dateCreated: time });

    const recipeJson: string = JSON.stringify(formData);
    const userIdJson: string = JSON.stringify(user.data.id);
    const json = {
      recipe: recipeJson,
      userId: userIdJson,
    };
    const response = actions.addNewRecipe(json);
  }

  return (
    <div className="w-1/2 h-full mx-auto flex flex-col justify-center items-center text-white">
      <form
        className="flex flex-col gap-2 items-center drop-shadow-lg rounded-xl m-4 w-full"
        onSubmit={(e) => handleSubmit(e)}
      >
        {error && <p className="text-red-600">{error}</p>}
        <input
          onChange={(e) =>
            setFormData((current) => ({ ...current, title: e.target.value }))
          }
          type="text"
          placeholder="Pancakes"
          className="bg-transparent border-b-[1px] border-gray-600 border-dashed outline-none"
        />
        <div className="flex flex-row">
          <div>
            <h2>Instructions</h2>
            <InstructionsInput />
          </div>
        </div>

        <div className="flex flex-row justify-between w-2/5">
          <button
            type="reset"
            className="rounded-md text-white bg-red-700 m-2 p-2 mb-4 hover:scale-110"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md text-white bg-green-700 m-2 p-2 mb-4 hover:scale-110"
          >
            Add recipe
          </button>
        </div>
      </form>
    </div>
  );
}
