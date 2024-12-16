import {
  ArrowLeftFromLine,
  ArrowRightFromLine,
  LogOut,
  Settings,
  SquareLibrary,
  SquarePlus,
  SquareUserRound,
} from "lucide-react";
import { useState } from "react";

// import { lilitaOne } from "../lib/fonts";
export default function NavBar() {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  return (
    <nav
      className={
        !isMinimized
          ? "bg-gray-500 border-r-2 border-black absolute *:text-xl h-full w-1/6"
          : "bg-gray-500 border-r-2 border-black absolute *:text-xl h-full w-fit"
      }
    >
      <div className="bg-white mb-4 pr-4 flex flex-row justify-between">
        <a href="/" className="inline-block">
          {!isMinimized ? (
            <h1 className="text-3xl">
              Recipe <span className="text-blue-700">Bank</span>
            </h1>
          ) : (
            <h1 className="text-3xl">
              R<span className="text-blue-700">B</span>
            </h1>
          )}
        </a>
        <button type="button" onClick={() => setIsMinimized(!isMinimized)}>
          {!isMinimized ? <ArrowLeftFromLine /> : <ArrowRightFromLine />}
        </button>
      </div>
      <ul className={`flex flex-col items-start`}>
        <li>
          <a href="/new-recipe">
            <SquarePlus className="inline" />
            {!isMinimized ? "New recipe" : ""}
          </a>
        </li>
        <li>
          <a href="/my-recipes">
            <SquareLibrary className="inline" />
            {!isMinimized ? "My recipes" : ""}
          </a>
        </li>
        <li>
          <a href="my-account">
            <SquareUserRound className="inline" />
            {!isMinimized ? "My account" : ""}
          </a>
        </li>
        <li className="flex flex-row justify-between w-full">
          <a href="my-account/settings">
            <Settings className="inline" />
            {!isMinimized ? "Settings" : ""}
          </a>
          <a href="logout">
            <LogOut className="inline" />
            {!isMinimized ? "Log out" : ""}
          </a>
        </li>
      </ul>
    </nav>
  );
}
