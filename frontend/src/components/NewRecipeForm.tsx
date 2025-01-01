import { type FormEvent, useState } from "react";
import { type Recipe } from "../lib/utils/types";
import { now } from "../lib/utils/constants";
import { actions } from "astro:actions";
import Cookies from "js-cookie";
import NewRecipeFormPopup from "./NewRecipeFormPopup";

export default function NewRecipeForm() {
  const [formData, setFormData] = useState<Recipe>({
    title: "",
    ingredients: [],
    instructions: [],
    link: "",
    dateCreated: `${now.toLocaleDateString("sv-SE")} ${now.toLocaleTimeString("sv-SE")}`,
  });
  const [error, setError] = useState<string>("");
  const [popupError, setPopupError] = useState<string>("");
  const [popupMenu, setPopupMenu] = useState({
    isActive: false,
    menuType: "",
  });
  const [newValue, setNewValue] = useState<string>("");

  function handleAddIngredient() {
    if (!newValue) {
      setPopupError("Ingredient cannot be empty.");
      return;
    }

    const ingredients: string[] = formData.ingredients;
    ingredients.push(newValue);
    setPopupMenu({ isActive: false, menuType: "" });
    setNewValue("");
    setPopupError("");
  }

  function handleAddInstruction() {
    if (!newValue) {
      setPopupError("Instruction cannot be empty.");
      return;
    }

    const instructions: string[] = formData.instructions;
    instructions.push(newValue);
    setPopupMenu({ isActive: false, menuType: "" });
    setNewValue("");
    setPopupError("");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const token = Cookies.get("token");

    if (!token) {
      setError("You are not logged in.")
      return;
    }

    
    if (!formData.title || !formData.ingredients || !formData.instructions || !token) {
      return;
    }

    const user = await actions.verifyUserJwt(token);

    if (!user) {
      return;
    }

    const recipeJson: string = JSON.stringify(formData);
    const userIdJson: string = JSON.stringify(user.data.id);
    const json = {
      recipe: recipeJson,
      userId: userIdJson
    }
    const response = actions.addNewRecipe(json);

    console.log(response)
  }

  return (
    <div className="w-1/2 mx-auto flex flex-col justify-center items-center h-full text-white">
      <h1 className="font-bold text-2xl tracking-wide text-center font uppercase">
        New recipe
      </h1>
      <form
        className="flex flex-col gap-2 items-center drop-shadow-lg rounded-xl m-4 w-full"
        onSubmit={(e) => handleSubmit(e)}
      >
        {error && <p className="text-red-600">{error}</p>}
        <div className="grid grid-rows-2 grid-cols-2 *:text-center gap-x-4 w-full">
          <label className="uppercase" htmlFor="title">
            Title
          </label>
          <label className="uppercase" htmlFor="link">
            Link to recipe
          </label>
          <input
            id="title"
            onChange={(e) =>
              setFormData((current) => ({ ...current, title: e.target.value }))
            }
            value={formData.title}
            type="text"
            className="h-8 max-w-sm border-[1px] rounded-lg border-gray-700 text-black w-1/2 m-auto"
            name="title"
          />
          <input
            id="link"
            onChange={(e) =>
              setFormData((current) => ({ ...current, link: e.target.value }))
            }
            value={formData.link}
            type="link"
            className="h-8 max-w-sm border-[1px] rounded-lg border-gray-700 text-black w-1/2 m-auto"
            name="link"
          />
        </div>
        <div className="grid grid-rows-1 grid-cols-2 *:flex justify-around *:flex-col *:items-center *:gap-y-4 w-full">
          <div>
            <label className="uppercase" htmlFor="password">
              Ingredients
            </label>
            {formData.ingredients.length > 0 ? (
              <ul className="list-disc list-inside w-full">
                {formData.ingredients.map((i, index) => (
                  <li className="break-all" key={index}>{i}</li>
                ))}
              </ul>
            ) : null}

            <button
              type="button"
              onClick={() =>
                setPopupMenu({ isActive: true, menuType: "ingredient" })
              }
              className="rounded-md text-white bg-slate-700 p-2 hover:scale-110"
            >
              Add ingredient
            </button>

            <NewRecipeFormPopup popupMenu={popupMenu} setPopupMenu={setPopupMenu}/>
          </div>
          <div>
            <label className="uppercase" htmlFor="password">
              Instructions
            </label>
            {formData.instructions.length > 0 ? (
              <ol className="list-decimal list-inside w-full">
                {formData.instructions.map((i, index) => (
                  <li className="break-all" key={index}>{i}</li>
                ))}
              </ol>
            ) : null}

            <button
              type="button"
              onClick={() =>
                setPopupMenu({ isActive: true, menuType: "instruction" })
              }
              className="rounded-md text-white bg-slate-700 p-2 hover:scale-110"
            >
              Add instruction
            </button>

            {popupMenu.isActive &&
            popupMenu.menuType === "instruction" ? (
              <div className="absolute flex top-1 flex-col items-center bg-blue-950 z-10 p-14 rounded-3xl border-[1px] border-white">
                <label className="uppercase" htmlFor="instruction">
                  Instruction
                </label>
                {popupError && <p className="text-red-600">{popupError}</p>}
                <input
                  id="instruction"
                  onChange={(e) => setNewValue(e.target.value)}
                  value={newValue}
                  type="text"
                  className="h-8 max-w-sm border-[1px] rounded-lg border-gray-700 text-black"
                  name="instruction"
                />

                <div>
                  <button
                    type="button"
                    onClick={() =>
                      setPopupMenu({ isActive: false, menuType: "" })
                    }
                    className="rounded-md text-white bg-slate-700 m-2 p-2 mb-4 hover:scale-110"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddInstruction}
                    type="button"
                    className="rounded-md text-white bg-slate-700 m-2 p-2 mb-4 hover:scale-110"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <button className="rounded-md text-white bg-slate-700 m-2 p-2 mb-4 hover:scale-110">
          Add recipe
        </button>
      </form>
    </div>
  );
}
