"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { lilitaOne } from "../lib/fonts";

export default function NavBar() {

  const { status } = useSession();
  
  return (
    <nav>
      <ul className={`${lilitaOne.className} w-full flex flex-row justify-between p-2`}>
        <li>
          <Link href="/">
            <h1 className="text-3xl">
              Recipe <span className="text-blue-700">Bank</span>
            </h1>
          </Link>
        </li>
        <li className="text-xl">
          {status === "authenticated" ? (
            <Link href="/account">My Account</Link>
          ) : (
            <Link href="/login">Login/Register</Link>
          ) }
        </li>
      </ul>
    </nav>
  );
}
