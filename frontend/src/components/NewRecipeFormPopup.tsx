import { useState } from "react";
import type { PopupMenu } from "../lib/utils/types";

interface NewRecipeFormPopupProps {
  popupMenu: PopupMenu;
  setPopupMenu: React.Dispatch<React.SetStateAction<PopupMenu>>;
  popupError: string;
}
export default function NewRecipeFormPopup({
  popupMenu,
  setPopupMenu,
  popupError,
}: NewRecipeFormPopupProps) {
  const [newValue, setNewValue] = useState("");

  function assureHandlerExists(
    handler: ((newValue: string) => void) | undefined
  ) {
    if (!handler) {
      console.log("no");
    } else {
      handler(newValue);
    }
  }
  return (
    <>
      {popupMenu.isActive && (
        <div className="absolute top-1 flex flex-col items-center text-white bg-blue-950 z-10 p-14 rounded-3xl border-[1px] border-white">
          <label className="uppercase" htmlFor={popupMenu.menuType}>
            New {popupMenu.menuType}
          </label>
          {popupError && <p className="text-red-600">{popupError}</p>}
          <input
            id={popupMenu.menuType}
            onChange={(e) => setNewValue(e.target.value)}
            value={newValue}
            type="text"
            className="h-8 max-w-sm border-[1px] rounded-lg border-gray-700 text-black"
            name={popupMenu.menuType}
          />

          <div>
            <button
              type="button"
              onClick={() => setPopupMenu({ isActive: false, menuType: "" })}
              className="rounded-md text-white bg-slate-700 m-2 p-2 mb-4 hover:scale-110"
            >
              Cancel
            </button>
            <button
              onClick={() => assureHandlerExists(popupMenu.handler)}
              type="button"
              className="rounded-md text-white bg-slate-700 m-2 p-2 mb-4 hover:scale-110"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
}
