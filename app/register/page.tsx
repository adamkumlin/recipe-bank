"use client";
import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "../actions/register";


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
  <div className="w-full h-full bg-[rgb(34,193,195)] bg-[linear-gradient(0deg,rgba(34,193,195,1)0%,rgba(121,93,247,1)9%,rgba(248,45,253,1)100%);]">
  <h1 className="text-white font-bold text-2xl tracking-wide text-center font-mono uppercase">
    Register
  </h1>
  <form
    className="flex flex-col items-center gap-2 border-2 border-black bg-white drop-shadow-lg rounded-xl m-4"
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

    <label className="uppercase font-mono" htmlFor="confirm-password">
      Confirm password
    </label>
    <input id="confirm-password" type="password" className="w-1/2 border-[1px] border-gray-700" name="confirm-password" />

    <button className="rounded text-white bg-slate-700 m-2 p-1 mb-4">Register</button>

    <Link href="/login" className="text-blue-600 border-t-2 border-black border-dashed pt-2">
      Already have an account?
    </Link>
  </form>
</div>
    )
}
