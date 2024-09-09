import { ActionResult } from "next/dist/server/app-render/types";
import { connectToDb } from "../db/connect";
import { getUserFromName } from "../db/user";
import { hash, verify } from "@node-rs/argon2";
import { lucia, UserDoc } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { generateIdFromEntropySize } from "lucia";
import { today } from "./constants";
import { validateUserCredentials } from "./helper";

export async function logIn(formData: FormData): Promise<ActionResult> {
  "use server";
  const username = formData.get("username")?.toString();
  const password = formData.get("password")?.toString();

  const errors = validateUserCredentials(username, password);
  if (errors.length > 0 || !username || !password) {
    return { error: errors.join("") };
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

  if (!existingUser) {
    return {
      error: "Incorrect username or password.",
    };
  }

  const validPassword = await verify(existingUser.passwordHash, password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  if (!validPassword) {
    return {
      error: "Incorrect username or password.",
    };
  }

  // Create session cookie
  const session = await lucia.createSession(existingUser._id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  // Redirect to start page
  // return redirect("/");
}

export async function signUp(formData: FormData): Promise<ActionResult> {
  "use server";
  const username = formData.get("username")?.toString();
  const password = formData.get("password")?.toString();

  const errors = validateUserCredentials(username, password);
  if (errors.length > 0 || !username || !password) {
    return { error: errors.join("") };
  }

  const passwordHash = await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  const client = connectToDb();

  if (!client) {
    return {
      error: "Error connecting to database.",
    };
  }

  const db = client.db("RecipeBank");
  const existingUser = await getUserFromName(username, db.collection("Users"));

  if (existingUser) {
    return {
      error: "Username already in use.",
    };
  }

  const userId = generateIdFromEntropySize(10);

  db.collection<UserDoc>("Users").insertOne({
    _id: userId,
    username: username,
    passwordHash: passwordHash,
    displayName: username,
    joinDate: today,
  });

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  // return redirect("/");
}
