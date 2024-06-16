import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="w-full">
      <ul className="flex flex-row justify-between items-center mx-1">
        <li>
          <Link href="/">
            <h1 className="font-mono text-3xl font-bold">
              Wiki <span className="text-blue-400">Buddy</span>
            </h1>
          </Link>
        </li>
        <li>
          <Link href="/account">My Account</Link>
        </li>
      </ul>
    </nav>
  );
}
