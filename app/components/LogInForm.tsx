import { signIn, auth } from "@/auth";
import { connectToDb } from "../db/connect";
import { getUserFromName, addNewUser } from "../db/user";
import { sanitizeUserName } from "../utils/helpers";
import { User } from "../utils/types";

export default function LogInForm() {
  async function logIn() {
    "use server";
    const session = await auth();
    const loggedInUser = session?.user;

    if (!loggedInUser || !loggedInUser.name) {
      return;
    }

    const client = connectToDb();

    if (!client) {
      return;
    }

    const usersCollection = client.db("Users").collection<User>("Users");

    const newUser: User = {
      name: sanitizeUserName(loggedInUser.name),
      displayName: sanitizeUserName(loggedInUser.name).toLowerCase(),
      joinDate: today,
    };

    await addNewUser(newUser, usersCollection);
  }
  return (
    <form action={logIn}>
      <button type="submit">Sign in with Google</button>
    </form>
  );
}
