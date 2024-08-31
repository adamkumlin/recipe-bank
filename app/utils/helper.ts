import { auth } from "@/auth";
import { User } from "next-auth";

export async function initialize(): Promise<User | null> {
  const session = await auth();
  const user = session?.user;

  if (user) {
    return user;
  }
  
  return null;
}
