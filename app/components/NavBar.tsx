import { auth } from "@/auth";
import Link from "next/link";

async function initialize() {
  const session = await auth();
  const user = session?.user?.email;

  return user;
}


export default async function NavBar() {
  const loggedInUser = await initialize();
  console.log(loggedInUser)
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
        <li>{!loggedInUser ? <Link href="/login">Log in</Link> : <Link href="/account">My Account</Link>}</li>
      </ul>
    </nav>
  );
}
