import Link from "next/link";

export default async function NavBar() {

  return (
    <nav className="w-full">
      <ul className="flex flex-row justify-between items-center mx-1">
        <li>
          <Link href="/">
            <h1 className="font-mono text-3xl font-bold">
              Recipe <span className="text-blue-400">Bank</span>
            </h1>
          </Link>
        </li>
        <li>
          {/* {!session ? (
            <Link href="/login">Log in</Link>
          ) : (
            <Link href="/account">My Account</Link>
          )} */}
        </li>
      </ul>
    </nav>
  );
}
