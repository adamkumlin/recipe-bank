import { signIn } from "@/auth";

export default function LogInButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}>
      <p>You are not logged in</p>
      <button type="submit">Log in with Google</button>
    </form>
  );
}
