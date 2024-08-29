import { auth } from "@/auth";
import { User } from "next-auth";

// Get potential user
async function initialize() {
  const session = await auth();
  const user = session?.user;
  
  if (user) {
    return user;
  }
  
  return null;
}
const user: User | null = await initialize();

export { user };
