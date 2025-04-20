import {
  ArrowLeftFromLine,
  ArrowRightFromLine,
  LogOut,
  Menu,
  Settings,
  SquareLibrary,
  SquarePlus,
  SquareUserRound,
  X,
} from 'lucide-react';
import { useState } from 'react';
import Cookies from 'js-cookie';

interface Props {
  isAlwaysMinimized: boolean;
}

export default function NavBar({ isAlwaysMinimized }: Props) {
  const [isMinimized, setIsMinimized] = useState<boolean>(isAlwaysMinimized);
  const [isActiveHamburger, setIsActiveHamburger] = useState<boolean>(false);

  function handleLogOutClick() {
    Cookies.remove('token');
    window.location.reload();
  }

  return (
    <>
      <nav
        className={
          !isMinimized
            ? 'bg-gray-900 absolute *:text-xl *:text-white h-full w-1/5 px-6 hidden sm:block'
            : 'bg-gray-900 absolute *:text-xl *:text-white h-full w-fit px-6 hidden sm:block'
        }>
        <div className="flex flex-row justify-end mt-2">
          <button type="button" onClick={() => setIsMinimized(!isMinimized)}>
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
              <SquarePlus className={!isMinimized ? 'inline mr-2' : 'inline'} />
              {!isMinimized ? 'New recipe' : ''}
            </a>
          </li>
          <li className="hover:bg-blue-500">
            <a href="/my-account/recipes">
              <SquareLibrary
                className={!isMinimized ? 'inline mr-2' : 'inline'}
              />
              {!isMinimized ? 'My recipes' : ''}
            </a>
          </li>
          <li className="hover:bg-blue-500">
            <a href="/my-account">
              <SquareUserRound
                className={!isMinimized ? 'inline mr-2' : 'inline'}
              />
              {!isMinimized ? 'My account' : ''}
            </a>
          </li>
          <li className="hover:bg-blue-500">
            <a href="/my-account/settings">
              <Settings className={!isMinimized ? 'inline mr-2' : 'inline'} />
              {!isMinimized ? 'Settings' : ''}
            </a>
          </li>
          <li className="hover:bg-blue-500">
            <button onClick={handleLogOutClick} className="w-full">
              <LogOut className={!isMinimized ? 'inline mr-2' : 'inline'} />
              {!isMinimized ? 'Log out' : ''}
            </button>
          </li>
        </ul>
      </nav>

      <div className="flex flex-row justify-between m-2 sm:hidden">
        <a className="text-center" href="/">
          <h1 className="text-3xl">
            Recipe <span className="text-blue-400">Bank</span>
          </h1>
        </a>
        <button
          type="button"
          onClick={() => setIsActiveHamburger(!isActiveHamburger)}>
          {!isActiveHamburger ? (
            <Menu className="min-w-[50px] min-h-[50px]" />
          ) : (
            <X className="min-w-[50px] min-h-[50px]" />
          )}
        </button>
      </div>
      {isActiveHamburger && (
        <nav className="bg-gray-900 absolute *:text-xl *:text-white w-full block sm:hidden">
          <ul className="flex flex-col items-center *:bg-blue-950 *:w-full *:p-8 *:*:block">
            <li className="hover:bg-blue-500">
              <a href="/new-recipe">
                <SquarePlus className="inline mr-2" />
                New recipe
              </a>
            </li>
            <li className="hover:bg-blue-500">
              <a href="/my-account/recipes">
                <SquareLibrary className="inline mr-2" />
                My recipes
              </a>
            </li>
            <li className="hover:bg-blue-500">
              <a href="/my-account">
                <SquareUserRound className="inline mr-2" />
                My account
              </a>
            </li>
            <li className="hover:bg-blue-500">
              <a href="/my-account/settings">
                <Settings className="inline mr-2" />
                Settings
              </a>
            </li>
            <li className="hover:bg-blue-500">
              <button onClick={handleLogOutClick} className="w-full">
                <LogOut className="inline mr-2" />
                Log out
              </button>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}
