import type { ObjectId } from "mongoose";
import { useState, type FormEvent } from "react";
import { CircleCheck, CircleSlash, X } from "lucide-react";

interface RecipeSettingsProps {
  recipeIds: ObjectId[];
}

export default function RecipeSettings({ recipeIds }: RecipeSettingsProps) {
  const [error, setError] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [isPopupAccepted, setIsPopupAccepted] = useState<boolean>(false);

  function handleDeleteClick() {
    console.log(recipeIds);
    if (recipeIds.length === 0) {
      setError("Error: No recipes selected.");
      return;
    }
    setError("");
    setShowPopup(true);

    if (!isPopupAccepted) {
        return;
    }

    
  }

  function handlePopupYesClick() {
    setShowPopup(false);
    setIsPopupAccepted(true);
  }


  return (
    <>
      <div className="flex flex-col w-fit p-10 bg-fuchsia-950 rounded-xl absolute left-[45%] top-1/3 border-[1px]">
        <h2>Are you sure?</h2>
        <div className="flex flex-row justify-center *:bg-slate-900 *:border-[1px] *:p-2 *:mx-2 *:rounded ">
          <button onClick={() => setShowPopup(false)}>
            <CircleSlash color="#b90000" className="inline" /> No
          </button>
          <button onClick={handlePopupYesClick}>
            <CircleCheck color="#0a7007" className="inline" /> Yes
          </button>
        </div>
      </div>
      <div className="flex flex-row justify-center mb-2">
        <button
          onClick={handleDeleteClick}
          className="rounded border-[1px] px-2 bg-blue-700 hover:bg-red-950"
        >
          <X color="#ff0000" className="inline" /> Delete
        </button>
      </div>
      <p className={!error ? "hidden" : "visible text-red-500"}>{error}</p>
    </>
  );
}
