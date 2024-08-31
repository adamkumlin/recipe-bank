import { hash } from "@node-rs/argon2";
import { ActionResult } from "next/dist/server/app-render/types";
import { addNewUser, getUserFromName } from "../db/user";
import { connectToDb } from "../db/connect";
import { lucia } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { generateIdFromEntropySize } from "lucia";

async function signUp(_: any, formData: FormData): Promise<ActionResult> {
  "use server";
  const username = formData.get("username")?.toString();

  if (!username) {
    return;
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

  const passwordHash = await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  const client = await connectToDb();

  if (!client) {
    return;
  }

  const db = client.db("RecipeBank");
  const existingUser = await getUserFromName(username, db.collection("Users"));

  if (existingUser) {
    return;
  }

  const userId = generateIdFromEntropySize(10);

  addNewUser({
    username: username,
    password_hash: passwordHash,

  }, db.collection("Users"))

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/");
}

export default function SignUpForm() {
  return (
    <form action={signUp}>
      <label>
        <input type="text" name="username" />
      </label>
      <label>
        <input type="password" name="password" />
      </label>
      <button type="submit">Sign up</button>
    </form>
  );
}
