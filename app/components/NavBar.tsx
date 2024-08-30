"use client";

import { auth } from "@/auth";
import Link from "next/link";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { useEffect, useState } from "react";
import { User } from "next-auth";

export default function NavBar() {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    async function initialize() {
      const session = await auth();
      const user = session?.user;
      console.log(user)
      if (user && user.email) {
        setUserName(user.email);
      }
    }

    const storedUserName = useSessionStorage("userName", null);

    if (!storedUserName || storedUserName === "") {
      initialize();

      if (!userName) {
        return;
      }

      useSessionStorage("userName", userName);
    }

    setUserName(storedUserName);
  });

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
          {!userName ? (
            <Link href="/login">Log in</Link>
          ) : (
            <Link href="/account">My Account</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
