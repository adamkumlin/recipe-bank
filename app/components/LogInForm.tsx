import { logIn } from "../utils/actions";

export default function LogInForm() {
  return (
    <form action={logIn}>
      <label>
        Username
        <input type="text" name="username" />
      </label>
      <label>
        Password
        <input type="password" name="password" />
      </label>
      <button type="submit">Log in</button>
    </form>
  );
}
