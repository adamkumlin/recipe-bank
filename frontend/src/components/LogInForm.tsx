import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import { validateUserCredentials } from "../lib/utils/helper";
import { actions } from "astro:actions";
import Cookies from "js-cookie";
import { animate } from "animejs";

export default function LogInForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [stopAnimations, setStopAnimations] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validation = validateUserCredentials(formData, false);
    if (validation !== "") {
      setError(validation);
      return;
    }

    const json: string = JSON.stringify(formData);

    const { data } = await actions.logIn(json);

    // If an error occurred, display it
    if (!data) {
      setError("wrogn!");
    } else {
      Cookies.set("token", data.access_token, { expires: 7 });
      window.location.reload();
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setStopAnimations(true);
    const type = e.target.id;
    setFormData((current) => ({ ...current, [type]: e.target.value }));
  }

  useEffect(() => {
    const email = animate("#email", {
      rotate: {
        from: "-1deg",
        to: "1deg",
        duration: 4000,
      },
      scale: {
        from: 1,
        to: 1.025,
        duration: 3000,
      },
      x: {
        from: "-10px",
        to: "10px",
        duration: 5000,
      },
      y: {
        from: "-2px",
        to: "2px",
        duration: 5000,
      },
      opacity: {
        from: 1,
        to: 0.9,
        duration: 5000,
      },
      loop: true,
      alternate: true,
    });
    const password = animate("#password", {
      rotate: {
        from: "1deg",
        to: "-1deg",
        duration: 4000,
      },
      scale: {
        from: 1.025,
        to: 1,
        duration: 3000,
      },
      x: {
        from: "10px",
        to: "-10px",
        duration: 5000,
      },
      y: {
        from: "2px",
        to: "-2px",
        duration: 5000,
      },
      opacity: {
        from: 1,
        to: 0.9,
        duration: 5000,
      },
      loop: true,
      alternate: true,
    });

    if (stopAnimations) {
        password.revert();
        email.revert();
      }
  }, [stopAnimations]);

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
          onChange={(e) => handleChange(e)}
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
          onChange={(e) => handleChange(e)}
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
