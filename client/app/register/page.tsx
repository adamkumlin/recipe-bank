"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { lilitaOne } from "../lib/fonts";
import { validateUserCredentials } from "../utils/helper";
import { register } from "../actions/register";
import bcrypt from "bcryptjs";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string>();
  const router = useRouter();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const validation = validateUserCredentials(formData, true);
    if (validation !== "") {
      setError(validation);
      return;
    }

    const json: string = JSON.stringify(formData);

    // Call server action
    const response = await register(json);

    // If an error occurred, display it
    if (response) {
      setError(response.message);
    } else {
      // Otherwise send user to login page
      router.push("/login");
    }
  }
  
  return (
    <div
      className={`w-full flex flex-col place-content-center ${lilitaOne.className} h-full`}
    >
      <h1 className="text-white font-bold text-2xl tracking-wide text-center font uppercase">
        Register
      </h1>
      <form
        className="flex flex-col gap-2 items-center drop-shadow-lg rounded-xl m-4"
        onSubmit={(event) => handleSubmit(event)}
      >
        {error && <p className="text-red-600">{error}</p>}
        <label className="uppercase text-white" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          onChange={(e) =>
            setFormData((current) => ({ ...current, email: e.target.value }))
          }
          value={formData.email}
          type="email"
          className="w-1/2 h-8 max-w-sm border-[1px] rounded-lg border-gray-700"
          name="email"
        />
        <label className="uppercase text-white" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          onChange={(e) =>
            setFormData((current) => ({ ...current, password: e.target.value }))
          }
          value={formData.password}
          type="password"
          className="w-1/2 h-8 max-w-sm border-[1px] rounded-lg border-gray-700"
          name="password"
        />

        <label className="uppercase text-white" htmlFor="confirm-password">
          Confirm password
        </label>
        <input
          id="confirm-password"
          onChange={(e) =>
            setFormData((current) => ({
              ...current,
              confirmPassword: e.target.value,
            }))
          }
          value={formData.confirmPassword}
          type="password"
          className="w-1/2 h-8 max-w-sm border-[1px] rounded-lg border-gray-700"
          name="confirm-password"
        />

        <button className="rounded-md text-white bg-slate-700 m-2 p-2 mb-4 hover:scale-110">
          Register
        </button>

        <Link
          href="/login"
          className="text-blue-100 border-t-2 border-black border-dashed pt-2 hover:text-red-400"
        >
          Already have an account?
        </Link>
      </form>
    </div>
  );
}
