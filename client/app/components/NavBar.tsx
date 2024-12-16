
import Link from "next/link";
// import { lilitaOne } from "../lib/fonts";

export default function NavBar() {

  return (
    <nav>
      <ul className={`w-full flex flex-row justify-between p-2`}>
        <li>
          <a href="/">
            <h1 className="text-3xl">
              Recipe <span className="text-blue-700">Bank</span>
            </h1>
          </a>
          <a>
          
          </a>
        </li>
        <li className="text-xl">
        </li>
      </ul>
    </nav>
  );
}
