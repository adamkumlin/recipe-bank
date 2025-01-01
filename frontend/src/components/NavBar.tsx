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
import { useRef, useState } from "react";
import Cookies from "js-cookie";

interface NavBarProps {
  isLoggedIn: boolean;
}

export default function NavBar({ isLoggedIn }: NavBarProps) {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  function handleToggleMinimize() {
    setIsMinimized(!isMinimized);
  }

  function handleLogOutClick() {
    Cookies.remove("token");
    window.location.reload();
  }

  return (
    <nav
      className={
        !isMinimized
          ? "bg-gray-900 absolute *:text-xl *:text-white h-full w-1/5 px-6"
          : "bg-gray-900 absolute *:text-xl *:text-white h-full w-fit px-6"
      }
    >
      <div className="flex flex-row justify-end mt-2">
        <button type="button" onClick={handleToggleMinimize}>
          {!isMinimized ? <ArrowLeftFromLine /> : <ArrowRightFromLine />}
        </button>
      </div>
      <a className="text-center" href="/">
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
      <ul className="flex flex-col items-center gap-5 *:bg-blue-950 *:w-full *:text-center *:rounded-lg mt-4 *:p-2 *:*:block">
        <li className="hover:bg-blue-500">
          <a href="/new-recipe">
            <SquarePlus className={!isMinimized ? "inline mr-2" : "inline"} />
            {!isMinimized ? "New recipe" : ""}
          </a>
        </li>
        <li className="hover:bg-blue-500">
          <a href="/my-account/recipes">
            <SquareLibrary
              className={!isMinimized ? "inline mr-2" : "inline"}
            />
            {!isMinimized ? "My recipes" : ""}
          </a>
        </li>
        {isLoggedIn ? (
          <li className="hover:bg-blue-500">
            <a href="/my-account">
              <SquareUserRound
                className={!isMinimized ? "inline mr-2" : "inline"}
              />
              {!isMinimized ? "My account" : ""}
            </a>
          </li>
        ) : null}
        <li className="hover:bg-blue-500">
          <a href="/my-account/settings">
            <Settings className={!isMinimized ? "inline mr-2" : "inline"} />
            {!isMinimized ? "Settings" : ""}
          </a>
        </li>
        <li className="hover:bg-blue-500">
          {!isLoggedIn ? (
            <a href="/login">
              <LogIn className={!isMinimized ? "inline mr-2" : "inline"} />
              {!isMinimized ? "Log in/Register" : ""}
            </a>
          ) : (
            <button onClick={handleLogOutClick} className="w-full">
              <LogOut className={!isMinimized ? "inline mr-2" : "inline"} />
              {!isMinimized ? "Log out" : ""}
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}
