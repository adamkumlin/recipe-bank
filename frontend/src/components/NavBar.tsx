import {
  ArrowLeftFromLine,
  ArrowRightFromLine,
  LogIn,
  LogOut,
  Settings,
  SquareLibrary,
  SquarePlus,
  SquareUserRound,
} from "lucide-react";
import { useState } from "react";

interface NavBarProps {
  isLoggedIn: boolean;
}

export default function NavBar({ isLoggedIn }: NavBarProps) {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  return (
    <nav
      className={
        !isMinimized
          ? "bg-gray-900 border-r-2 absolute *:text-xl *:text-white h-full w-1/5 px-6"
          : "bg-gray-900 border-r-2 absolute *:text-xl *:text-white h-full w-fit px-6"
      }
    >
      <div className="flex flex-row justify-end mt-2">
        <button type="button" onClick={() => setIsMinimized(!isMinimized)}>
          {!isMinimized ? <ArrowLeftFromLine /> : <ArrowRightFromLine />}
        </button>
      </div>
        <a className="text-center font-['Lilita_One']" href="/">
          {!isMinimized ? (
            <h1 className="text-3xl">
              Recipe <span className="text-blue-400">Bank</span>
            </h1>
          ) : (
            <h1 className="text-3xl">
              R<span className="text-blue-700">B</span>
            </h1>
          )}
        </a>
      <ul className="flex flex-col items-center font-['Lilita_One'] gap-5 *:bg-blue-950 *:w-full *:text-center *:rounded-lg mt-4 *:p-2">
        <li>
          <a href="/new-recipe">
            <SquarePlus className={!isMinimized ? "inline mr-2" : "inline"} />
            {!isMinimized ? "New recipe" : ""}
          </a>
        </li>
        <li>
          <a href="/my-recipes">
            <SquareLibrary className={!isMinimized ? "inline mr-2" : "inline"} />
            {!isMinimized ? "My recipes" : ""}
          </a>
        </li>
        <li>
          <a href="my-account">
            <SquareUserRound className={!isMinimized ? "inline mr-2" : "inline"} />
            {!isMinimized ? "My account" : ""}
          </a>
        </li>
        <li>
          <a href="my-account/settings">
            <Settings className={!isMinimized ? "inline mr-2" : "inline"} />
            {!isMinimized ? "Settings" : ""}
          </a>
        </li>
        <li>
          {!isLoggedIn ? (
            <a href="login">
              <LogIn className={!isMinimized ? "inline mr-2" : "inline"} />
              {!isMinimized ? "Log in" : ""}
            </a>
          ) : (
            <a href="logout">
              <LogOut className={!isMinimized ? "inline mr-2" : "inline"} />
              {!isMinimized ? "Log out" : ""}
            </a>
          )}
        </li>
      </ul>
    </nav>
  );
}
