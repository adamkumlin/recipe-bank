import LogInForm from "../components/LogInForm";
import SignUpForm from "../components/SignUpForm";
import { validateRequest } from "../db/connect";

export default async function LogIn() {

  const {session} = await validateRequest();

  return (
    <>
    <LogInForm />
    <SignUpForm />
    </>
  )
}
