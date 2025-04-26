import {
  ArrowLeftFromLine,
  ArrowRightFromLine,
  Settings,
  SquareLibrary,
  SquarePlus,
  SquareUserRound,
} from 'lucide-react';
import { useState } from 'react';
import Button from './Button';

interface Props {
  isAlwaysMinimized: boolean;
  isLoggedIn: boolean;
}

export default function NavBar({ isAlwaysMinimized, isLoggedIn }: Props) {
  const [isMinimized, setIsMinimized] = useState<boolean>(isAlwaysMinimized);

  return (
    <>
      {isLoggedIn ? (
        <nav
          className={
            !isMinimized
              ? 'bg-navbar absolute *:text-xl *:text-main h-full w-1/5 px-6 hidden sm:block'
              : 'bg-navbar absolute *:text-xl *:text-main h-full w-fit px-6 hidden sm:block'
          }
        >
          <div className="flex flex-row justify-end mt-2">
            <Button type="button" onClick={() => setIsMinimized(!isMinimized)}>
              {!isMinimized ? <ArrowLeftFromLine /> : <ArrowRightFromLine />}
            </Button>
          </div>
          <a className="text-center" href="/">
            {!isMinimized ? (
              <h1 className="text-5xl">
                Recipe <span className="text-blue-400">Bank</span>
              </h1>
            ) : (
              <h1 className="text-5xl">
                R<span className="text-blue-700">B</span>
              </h1>
            )}
          </a>
          <ul className="flex flex-col items-center gap-5 *:bg-blue-950 *:w-full *:text-center *:rounded-lg mt-4 *:p-2 *:*:block">
            <li className="hover:bg-blue-500">
              <a href="/new-recipe">
                <SquarePlus
                  className={!isMinimized ? 'inline mr-2' : 'inline'}
                />
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
          </ul>
        </nav>
      ) : (
        <div
          className={
            !isMinimized
              ? 'bg-navbar absolute *:text-xl *:text-main h-full w-1/5 px-6 hidden sm:block'
              : 'bg-navbar absolute *:text-xl *:text-main h-full w-fit px-6 hidden sm:block'
          }
        >
          <div className="flex flex-row justify-end mt-2">
            <Button type="button" onClick={() => setIsMinimized(!isMinimized)}>
              {!isMinimized ? <ArrowLeftFromLine /> : <ArrowRightFromLine />}
            </Button>
          </div>
          <a className="text-center" href="/">
            {!isMinimized ? (
              <h1 className="text-5xl">
                Recipe <span className="text-blue-400">Bank</span>
              </h1>
            ) : (
              <h1 className="text-5xl">
                R<span className="text-blue-700">B</span>
              </h1>
            )}
          </a>
          {!isMinimized ? (
            <p className="mt-10">
              You are not currently logged in, please <a className='text-blue-400' href="/login">log in</a> or{' '}
              <a className='text-blue-400' href='/register'>register</a>.
            </p>
          ) : null}
        </div>
      )}
    </>
  );
}
