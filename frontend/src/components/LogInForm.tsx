
import { type FormEvent, useState } from "react";
import { validateUserCredentials } from "../lib/utils/helper";
import { actions } from 'astro:actions';
import Cookies from "js-cookie";

export default function LogInForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validation = validateUserCredentials(formData, false);
    if (validation !== "") {
      setError(validation);
      return;
    }

    const json: string = JSON.stringify(formData);

    const {data} = await actions.logIn(json);
    
    // If an error occurred, display it
    if (!data) {
      setError("wrogn!");
    } else {
      Cookies.set("token", data.access_token, {expires: 7})
      window.location.reload();
    }
  }

  return (
    <div
      className={`flex flex-col place-content-center h-full text-white w-1/2 m-auto`}
    >
      <h1 className=" font-bold text-2xl tracking-wide text-center font uppercase">
        Log in
      </h1>
      <form
        className="flex flex-col gap-2 items-center drop-shadow-lg rounded-xl m-4"
        onSubmit={handleSubmit}
      >
        {error && <p className="text-red-500">{error}</p>}
        <label className="uppercase" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          autoComplete="off"
          onChange={(e) =>
            setFormData((current) => ({ ...current, email: e.target.value }))
          }
          value={formData.email}
          type="email"
          className="w-1/2 h-8 max-w-sm text-black border-[1px] rounded-lg border-gray-700"
          name="email"
        />
        <label className="uppercase" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          onChange={(e) =>
            setFormData((current) => ({ ...current, password: e.target.value }))
          }
          value={formData.password}
          type="password"
          className="w-1/2 h-8 max-w-sm text-black border-[1px] rounded-lg border-gray-700"
          name="password"
        />

        <button className="rounded-md text-white bg-slate-700 m-2 p-2 mb-4 hover:scale-110">
          Log in
        </button>

        <a
          href="/register"
          className="text-blue-500 border-t-2 border-black border-dashed pt-2 hover:text-blue-900"
        >
          Don't have an account?
        </a>
      </form>
    </div>
  );
}
