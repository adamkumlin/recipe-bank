import { signUp } from "../utils/actions";

export default function SignUpForm() {
  return (
    <form action={signUp}>
      <label>
        Username
        <input type="text" name="username" />
      </label>
      <label>
        Password
        <input type="password" name="password" />
      </label>
      <button type="submit">Sign up</button>
    </form>
  );
}
