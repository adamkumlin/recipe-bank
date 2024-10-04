"use client";
import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "../actions/register";
import { lilitaOne } from "../lib/fonts";

export default function Register() {
  const [error, setError] = useState<string>();
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    const r = await register({
        email: formData.get("email"),
        password: formData.get("password"),
        name: formData.get("name")    
      });
      ref.current?.reset();
      if(r?.error){
        setError(r.error);
        return;
      } else {
        return router.push("/login");
      }
};

return(
  <div className={`w-full flex flex-col place-content-center ${lilitaOne.className} h-full bg-[rgb(34,193,195)] bg-[linear-gradient(0deg,rgba(34,193,195,1)0%,rgba(121,93,247,1)9%,rgba(248,45,253,1)100%);]`}>
      <h1 className="text-white font-bold text-2xl tracking-wide text-center font uppercase">
        Register
      </h1>
      <form
        className="flex flex-col gap-2 items-center drop-shadow-lg rounded-xl m-4"
        onSubmit={handleSubmit}
      >
    {error && <p className="text-red-600">{error}</p>}
    <label className="uppercase text-white" htmlFor="email">
      Email
    </label>
    <input id="email" type="email" className="w-1/2 h-8 max-w-sm border-[1px] rounded-lg border-gray-700" name="email" />
    <label className="uppercase text-white" htmlFor="password">
      Password
    </label>
    <input id="password" type="password" className="w-1/2 h-8 max-w-sm border-[1px] rounded-lg border-gray-700" name="password" />

    <label className="uppercase text-white" htmlFor="confirm-password">
      Confirm password
    </label>
    <input id="confirm-password" type="password" className="w-1/2 h-8 max-w-sm border-[1px] rounded-lg border-gray-700" name="confirm-password" />

    <button className="rounded-md text-white bg-slate-700 m-2 p-2 mb-4 hover:scale-110">Register</button>

    <Link href="/login" className="text-blue-100 border-t-2 border-black border-dashed pt-2 hover:text-red-400">
      Already have an account?
    </Link>
  </form>
</div>
    )
}
