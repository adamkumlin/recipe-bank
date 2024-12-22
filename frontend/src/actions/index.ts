import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { today } from "../lib/utils/constants";
import bcrypt from "bcryptjs";

export const server = {
  logIn: defineAction({
    input: z.string(),
    handler: async (input) => {
      const formData = JSON.parse(input);

      const request = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      
      if (request.ok) {
        const response = await request.json();
        const jsonResponse = JSON.parse(JSON.stringify(response));
        return jsonResponse;
      }


      return "";
    },
  }),
  register: defineAction({
    input: z.string(),
    handler: async (input) => {
      const formData = JSON.parse(input);

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
    },
  }),
};
