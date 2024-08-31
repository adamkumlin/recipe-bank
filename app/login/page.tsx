import SignOutButton from "../components/LogOutButton";
import LogInButton from "../components/LogInButton";
import { initialize } from "../utils/helper";

export default async function LogIn() {
  const user = await initialize();

  return <>{user ? <SignOutButton /> : <LogInButton />}</>;
}
