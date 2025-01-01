interface NewRecipeFormPopupProps {
  popupMenu: {
    isActive: boolean;
    menuType: "ingredient" | "instruction";
  };
  setPopupMenu: React.Dispatch<
    React.SetStateAction<{
      isActive: boolean;
      menuType: "ingredient" | "instruction";
    }>
  >;
  popupError: string;
  newValue: string;
  setNewValue: React.Dispatch<React.SetStateAction<string>>;
  handleAddNewValue: (newValue: string) => void;
}
export default function NewRecipeFormPopup({
  popupMenu,
  setPopupMenu,
  popupError,
  newValue,
  setNewValue,
  handleAddNewValue
}: NewRecipeFormPopupProps) {
  return (
    <>
      {popupMenu.isActive && popupMenu.menuType === "ingredient" ? (
        <div className="absolute top-1 flex flex-col items-center bg-blue-950 z-10 p-14 rounded-3xl border-[1px] border-white">
          <label className="uppercase" htmlFor="ingredient">
            Ingredient
          </label>
          {popupError && <p className="text-red-600">{popupError}</p>}
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
                setPopupMenu({ isActive: false, menuType: "ingredient" })
              }
              className="rounded-md text-white bg-slate-700 m-2 p-2 mb-4 hover:scale-110"
            >
              Cancel
            </button>
            <button
              onClick={() => handleAddNewValue(newValue)}
              type="button"
              className="rounded-md text-white bg-slate-700 m-2 p-2 mb-4 hover:scale-110"
            >
              Done
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
