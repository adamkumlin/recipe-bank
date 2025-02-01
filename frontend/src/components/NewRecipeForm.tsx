import { type FormEvent, useState } from "react";
import { type PopupMenu, type Recipe } from "../lib/utils/types";
import { actions } from "astro:actions";
import Cookies from "js-cookie";
import NewRecipeFormPopup from "./NewRecipeFormPopup";
import clipboard from "../assets/clipboard.png";
import { useTime } from "../hooks/useTime";

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
    <div className="w-1/2 mx-auto flex flex-col justify-center items-center h-full text-black">
      <img className="absolute -z-10" src={clipboard.src} width={500} />
      <h1 className="font-bold text-2xl tracking-wide text-center font uppercase mt-3">
        New recipe
      </h1>
      <form
        className="flex flex-col gap-2 items-center drop-shadow-lg rounded-xl m-4 w-full"
        onSubmit={(e) => handleSubmit(e)}
      >
        {error && <p className="text-red-600">{error}</p>}

        <label className="uppercase" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          onChange={(e) =>
            setFormData((current) => ({ ...current, title: e.target.value }))
          }
          placeholder="Pancakes"
          value={formData.title}
          type="text"
          className="h-8 max-w-sm border-[1px] rounded-lg border-gray-700 text-black w-1/2 m-auto"
          name="title"
        />
        <label className="uppercase" htmlFor="link">
          Link to recipe
        </label>
        <input
          id="link"
          onChange={(e) =>
            setFormData((current) => ({ ...current, link: e.target.value }))
          }
          value={formData.link}
          placeholder="https://example.com"
          type="link"
          className="h-8 max-w-sm border-[1px] rounded-lg border-gray-700 text-black w-1/2 m-auto"
          name="link"
        />

        <label className="uppercase" htmlFor="password">
          Ingredients
        </label>
        {formData.ingredients.length > 0 ? (
          <ul className="list-disc list-inside w-full max-h-24 overflow-auto">
            {formData.ingredients.map((i, index) => (
              <li key={index}>{i}</li>
            ))}
          </ul>
        ) : null}

        <button
          type="button"
          onClick={() =>
            setPopupMenu({
              isActive: true,
              menuType: "ingredient",
              handler: handleAddIngredient,
            })
          }
          className="rounded-md text-white bg-blue-800 p-2 hover:scale-110"
        >
          Add ingredient
        </button>

        <NewRecipeFormPopup
          popupMenu={popupMenu}
          setPopupMenu={setPopupMenu}
          popupError={popupError}
        />
        <label className="uppercase" htmlFor="password">
          Instructions
        </label>
        {formData.instructions.length > 0 ? (
          <ol className="list-decimal list-inside w-full max-h-24 overflow-auto">
            {formData.instructions.map((i, index) => (
              <li key={index}>{i}</li>
            ))}
          </ol>
        ) : null}

        <button
          type="button"
          onClick={() =>
            setPopupMenu({
              isActive: true,
              menuType: "instruction",
              handler: handleAddInstruction,
            })
          }
          className="rounded-md text-white bg-blue-800 p-2 hover:scale-110"
        >
          Add instruction
        </button>

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
