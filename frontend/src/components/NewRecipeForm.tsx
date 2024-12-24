import { type FormEvent, useState } from "react";
import { type Recipe } from "../lib/utils/types";
import { today } from "../lib/utils/constants";
// import { lilitaOne } from "../../../client/app/lib/fonts";

export default function NewRecipeForm() {
  const [formData, setFormData] = useState<Recipe>({
    title: "",
    ingredients: [],
    instructions: [],
    link: "",
    dateCreated: today.toString(),
  });
  const [error, setError] = useState<string>();
  const [showPopupMenu, setShowPopupMenu] = useState({
    isActive: false,
    menuType: "",
  });
  const [newValue, setNewValue] = useState<string>("");

  function handleAddIngredient() {
    const ingredients: string[] = formData.ingredients;
    ingredients.push(newValue);
    setShowPopupMenu({ isActive: false, menuType: "" });
    setNewValue("");
  }

  function handleAddInstruction() {
    const instructions: string[] = formData.instructions;
    instructions.push(newValue);
    setShowPopupMenu({ isActive: false, menuType: "" });
    setNewValue("");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!formData.title || !formData.ingredients || !formData.instructions) {
      return;
    }

    const json: string = JSON.stringify(formData);
  }

  return (
    <div className="w-full flex flex-col justify-center items-center h-full text-white">
      <h1 className="font-bold text-2xl tracking-wide text-center font uppercase">
        New recipe
      </h1>
      <form
        className="flex flex-col gap-2 items-center drop-shadow-lg rounded-xl m-4 bg-red-500 w-1/2"
        onSubmit={(e) => handleSubmit(e)}
      >
        {error && <p className="text-red-600">{error}</p>}
        <div className="grid grid-rows-2 grid-cols-2 *:text-center gap-x-4">
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
            className="h-8 max-w-sm border-[1px] rounded-lg border-gray-700 text-black"
            name="title"
          />
          <input
            id="link"
            onChange={(e) =>
              setFormData((current) => ({ ...current, link: e.target.value }))
            }
            value={formData.link}
            type="text"
            className="h-8 max-w-sm border-[1px] rounded-lg border-gray-700 text-black"
            name="link"
          />
        </div>
        <div className="grid grid-rows-1 grid-cols-2 *:flex justify-around *:flex-col *:items-center *:gap-y-4">
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
                setShowPopupMenu({ isActive: true, menuType: "ingredient" })
              }
              className="rounded-md text-white bg-slate-700 p-2 hover:scale-110"
            >
              Add ingredient
            </button>

            {showPopupMenu.isActive &&
            showPopupMenu.menuType === "ingredient" ? (
              <div className="absolute flex flex-col items-center bg-blue-600 z-10 p-14">
                <label className="uppercase" htmlFor="ingredient">
                  Ingredient
                </label>
                <input
                  id="ingredient"
                  onChange={(e) => setNewValue(e.target.value)}
                  value={newValue}
                  type="text"
                  className="h-8 max-w-sm border-[1px] rounded-lg border-gray-700 text-black"
                  name="ingredient"
                />

                <div>
                  <button
                    type="button"
                    onClick={() =>
                      setShowPopupMenu({ isActive: false, menuType: "" })
                    }
                    className="rounded-md text-white bg-slate-700 m-2 p-2 mb-4 hover:scale-110"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddIngredient}
                    type="button"
                    className="rounded-md text-white bg-slate-700 m-2 p-2 mb-4 hover:scale-110"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : null}
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
                setShowPopupMenu({ isActive: true, menuType: "instruction" })
              }
              className="rounded-md text-white bg-slate-700 p-2 hover:scale-110"
            >
              Add instruction
            </button>

            {showPopupMenu.isActive &&
            showPopupMenu.menuType === "instruction" ? (
              <div className="absolute flex flex-col items-center bg-blue-600 z-10 p-14">
                <label className="uppercase" htmlFor="instruction">
                  Instruction
                </label>
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
                      setShowPopupMenu({ isActive: false, menuType: "" })
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
          Register
        </button>
      </form>
    </div>
  );
}
