"use server";
import bcrypt from "bcryptjs";
import { today } from "../utils/constants";

export async function register(json: string) {
  const formData = JSON.parse(json);
  const hash = await bcrypt.hash(formData.password, 8);

  const response = fetch("http://localhost:3001/user/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: formData.email,
      password: hash,
      joinDate: today.toISOString(),
    }),
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((err) => {
          throw new Error(err.message);
        });
      }
    })
    .catch((error) => {
      Promise.reject(error.message);
    });

    return response;
}
