import { auth } from "@/auth";
import { createContext } from "react";
import { User } from "next-auth";
import RootLayout from "../layout";

// const UserContext = createContext<User | null>(null);

// Get potential user
async function initialize() {
  const session = await auth();
  const user = session?.user;

  if (user) {
    return user;
  }

  return null;
}

export default async function UserProvider() {
  const user = await initialize();

  return (
    <>
    </>
  )
}

// export { UserContext };
