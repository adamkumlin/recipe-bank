"use server";
import bcrypt from "bcryptjs";
import { today } from "../lib/utils/constants";

export async function register(json: string) {
  const formData = JSON.parse(json);

  // Hash and salt the password
  const hash = await bcrypt.hash(formData.password, 8);
  
  const request = await fetch("http://localhost:3001/user/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: formData.email,
      password: hash,
      joinDate: today.toISOString(),
    }),
  });

  // If an error occurred, return it
  if (!request.ok) {
    const response = await request.json();
    const jsonResponse = JSON.parse(JSON.stringify(response));
    return jsonResponse;
  }

  return "";
}
