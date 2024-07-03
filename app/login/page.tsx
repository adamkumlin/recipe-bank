import { auth } from "@/auth";
import SignOutButton from "../components/LogOutButton";
import LogInButton from "../components/LogInButton";

export default async function LogIn() {
  const session = await auth();
  const user = session?.user?.email;

  return <>{user ? <SignOutButton /> : <LogInButton />}</>;
}
