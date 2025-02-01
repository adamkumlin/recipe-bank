import { type FormEvent, useState } from "react";
import { validateUserCredentials } from "../lib/utils/helper";
import Cookies from "js-cookie";
import { actions } from "astro:actions";
import { useTime } from "../hooks/useTime";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    dateCreated: "",
  });
  const [error, setError] = useState<string>();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validation = validateUserCredentials(formData, true);
    if (validation !== "") {
      setError(validation);
      return;
    }

    const time = await useTime();
    setFormData({ ...formData, dateCreated: time });

    const json: string = JSON.stringify(formData);

    // Call server action
    const { data } = await actions.register(json);

    if (!data) {
      setError("wrogn!");
    } else {
      const { data } = await actions.logIn(json);
      Cookies.set("token", data.access_token, { expires: 7 });
      window.location.reload();
    }
  }

  return (
    <div className={`w-1/2 m-auto flex flex-col place-content-center h-full`}>
      <h1 className="font-bold text-2xl tracking-wide text-center font uppercase">
        Register
      </h1>
      <form
        className="flex flex-col gap-2 items-center drop-shadow-lg rounded-xl m-4"
        onSubmit={(event) => handleSubmit(event)}
      >
        {error && <p className="text-red-600">{error}</p>}
        <label className="uppercase" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          onChange={(e) =>
            setFormData((current) => ({ ...current, email: e.target.value }))
          }
          value={formData.email}
          type="email"
          className="w-1/2 h-8 max-w-sm border-[1px] rounded-lg text-black border-gray-700"
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
          className="w-1/2 h-8 max-w-sm border-[1px] rounded-lg text-black border-gray-700"
          name="password"
        />

        <label className="uppercase" htmlFor="confirm-password">
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
          className="w-1/2 h-8 max-w-sm border-[1px] rounded-lg text-black border-gray-700"
          name="confirm-password"
        />

        <button className="rounded-md text-white bg-slate-700 m-2 p-2 mb-4 hover:scale-110">
          Register
        </button>

        <a
          href="/login"
          className="text-blue-500 border-t-2 border-black border-dashed pt-2 hover:text-blue-900"
        >
          Already have an account?
        </a>
      </form>
    </div>
  );
}
