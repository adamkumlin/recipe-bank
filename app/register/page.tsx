import { connectToDb } from "../db/connect";
import { User } from "../utils/types";
import { addNewUser, getUserFromName } from "../db/user";
import { sanitizeUserName } from "../utils/helpers";
import { today } from "../utils/constants";

export default async function Register() {

  async function register(formData: FormData) {
    "use server";
    
    const userName = formData.get("userName")?.toString();
    if (userName === "" || !userName) {
      return;
    }
    // Attempt to connect
    const client = await connectToDb();

    if (!client) {
      return;
    }
    const usersCollection = await client.db("Users").collection<User>("Users");

    if (!await getUserFromName(userName, usersCollection)) {
      return;
    }

    const newUser: User = {
      name: sanitizeUserName(userName),
      displayName: sanitizeUserName(userName),
      joinDate: today,
    };
    await addNewUser(newUser, usersCollection);
    await client.close();
  }

  return (
    <div>
      <form action={register}>
        <input
          type="text"
          required
          name="userName"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
