import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { now } from "../lib/utils/constants";
import bcrypt from "bcryptjs";
import { type Recipe } from "../lib/utils/types";

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
          joinDate: now.toISOString(),
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
  addNewRecipe: defineAction({
    input: z.object({
      recipe: z.string(),
      userId: z.string()
    }),
    handler: async (input) => {
      const formData: Recipe = JSON.parse(input.recipe);
      const userId = JSON.parse(input.userId);
      const request = await fetch("http://localhost:3001/recipe/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          title: formData.title,
          ingredients: formData.ingredients,
          instructions: formData.instructions,
          link: formData.link,
          dateCreated: formData.dateCreated
        }),
      });

      if (!request.ok) {
        return {
          error: "Error adding recipe."
        }
      } else {
        return {
          message: "Recipe added successfully."
        }
      }
    }
  }),
  verifyUserJwt: defineAction({
    input: z.string(),
    handler: async (input) => {
      const request = await fetch("http://localhost:3001/auth/verify-user/" + input, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (!request.ok) {
        return {
          error: "Error verifying user."
        }
      } else {
        const response = await request.json();
        const jsonResponse = JSON.parse(JSON.stringify(response));
        return jsonResponse;
      }
    }
  }),
  getUserRecipes: defineAction({
    input: z.string(),
    handler: async (input) => {
      const request = await fetch("http://localhost:3001/recipe/user/" + input, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (!request.ok) {
        return {
          error: "Error fetching user recipes."
        }
      } else {
        const response = await request.json();
        const jsonResponse = JSON.parse(JSON.stringify(response));
        return jsonResponse;
      }
    }
  }),
  getRecipe: defineAction({
    input: z.string(),
    handler: async (input) => {
      const request = await fetch("http://localhost:3001/recipe/id/" + input, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (!request.ok) {
        return {
          error: "Error fetching user recipes."
        }
      } else {
        const response = await request.json();
        const jsonResponse = JSON.parse(JSON.stringify(response));
        return jsonResponse;
      }
    }
  }),
  deleteRecipe: defineAction({
    input: z.string(),
    handler: async (input) => {
      const request = await fetch("http://localhost:3001/recipe/id/" + input, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (!request.ok) {
        return {
          error: "Error fetching user recipes."
        }
      }
    }
  })
};
