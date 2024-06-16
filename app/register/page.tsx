"use client";

import { FormEvent, useState } from "react";
import { connectToDb } from "../db/connect";
import { User } from "../utils/types";
import { addNewUser, getUserFromName } from "../db/user";

export default function Register() {
  const [newUser, setNewUser] = useState<User>({
    name: "",
    joinDate: today,
  });

  async function register(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (newUser.name === "") {
      return;
    }
    // Attempt to connect
    const client = await connectToDb();

    if (!client) {
      return;
    }

    const users = await client.db("Users").collection<User>("Users");

    if (!await getUserFromName(newUser.name, users)) {
      return;
    }

    await addNewUser(newUser, users);
    await client.close();
  }

  return (
    <div>
      <form onSubmit={register}>
        <input
          type="text"
          required
          onChange={(e) =>
            setNewUser((current) => ({
              ...current,
              name: e.target.value,
            }))
          }
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
