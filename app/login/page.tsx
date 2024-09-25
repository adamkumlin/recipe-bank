"use client";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LogIn() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    if (res?.error) {
      setError(res.error as string);
    }
    if (res?.ok) {
      return router.push("/");
    }
  };

  return (
    <div className="w-full h-full bg-[rgb(34,193,195)] bg-[linear-gradient(0deg,rgba(34,193,195,1)0%,rgba(121,93,247,1)9%,rgba(248,45,253,1)100%);]">
      <h1 className="text-white font-bold text-2xl tracking-wide text-center font-mono uppercase">
        Log in
      </h1>
      <form
        className="flex flex-col gap-2 items-center border-2 border-black bg-white drop-shadow-lg rounded-xl m-4"
        onSubmit={handleSubmit}
      >
        {error && <p className="text-red-600">{error}</p>}
        <label className="uppercase font-mono" htmlFor="email">
          Email
        </label>
        <input id="email" type="email" className="w-1/2 border-[1px] border-gray-700" name="email" />
        <label className="uppercase font-mono" htmlFor="password">
          Password
        </label>
        <input id="password" type="password" className="w-1/2 border-[1px] border-gray-700" name="password" />

        <button className="rounded text-white bg-slate-700 m-2 p-1 mb-4">Log in</button>

        <Link href="/register" className="text-blue-600 border-t-2 border-black border-dashed pt-2">
          Don't have an account?
        </Link>
      </form>
    </div>
  );
}
