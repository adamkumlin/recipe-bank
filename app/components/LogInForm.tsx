import { hash, verify } from "@node-rs/argon2";
import { ActionResult } from "next/dist/server/app-render/types";
import { addNewUser, getUserFromName } from "../db/user";
import { connectToDb } from "../db/connect";
import { lucia } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function logIn(formData: FormData): Promise<ActionResult> {
  "use server";
  const username = formData.get("username")?.toString();
  if (!username) {
    return {
      error: "Username cannot be empty.",
    };
  }

  const password = formData.get("password")?.toString();
  if (!password) {
    return {
      error: "Password cannot be empty.",
    };
  }

  if (password.length < 8 || password.length > 40) {
    return {
      error: "Password has to be between 8 and 40 characters long.",
    };
  }

  const client = connectToDb();

  if (!client) {
    return {
      error: "Error connecting to database.",
    };
  }
  // Get the database and the specific collection
  const db = client.db("RecipeBank");
  const existingUser = await getUserFromName(username, db.collection("Users"));

  console.log(existingUser)
  if ((existingUser && existingUser.length === 0) || !existingUser) {
    return {
      error: "Incorrect username or password.",
    };
  }

  const validPassword = await verify(existingUser[0].passwordHash, password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  console.log(validPassword)
  if (!validPassword) {
    return {
      error: "Incorrect username or password.",
    };
  }

  // Create session cookie
  const session = await lucia.createSession(existingUser[0]._id.toString(), {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  // Redirect to start page
  return redirect("/");
}

export default function LogInForm() {
  return (
    <form action={logIn}>
      <label>
        Username
        <input type="text" name="username" />
      </label>
      <label>
        Password
        <input type="password" name="password" />
      </label>
      <button type="submit">Log in</button>
    </form>
  );
}
