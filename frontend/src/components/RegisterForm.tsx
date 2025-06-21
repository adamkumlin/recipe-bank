import { useState } from 'react';
import { validateUserCredentials } from '../lib/utils/helper';
import Cookies from 'js-cookie';
import { actions } from 'astro:actions';
import { useTime } from '../hooks/useTime';
import Button from './Button';
import TextField from './TextField';
import PasswordField from './PasswordField';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    dateCreated: '',
  });
  const [error, setError] = useState<string>();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validation = validateUserCredentials(formData, true);
    if (validation !== '') {
      setError(validation);
      return;
    }

    const time = await useTime();
    setFormData({ ...formData, dateCreated: time });

    const json: string = JSON.stringify(formData);

    // Call server action
    const { data } = await actions.register(json);

    if (!data) {
      setError('fel!');
    } else {
      const { data } = await actions.logIn(json);
      Cookies.set('token', data.access_token, { expires: 7 });
      window.location.reload();
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const type = e.target.id;
    setFormData(current => ({ ...current, [type]: e.target.value }));
  }

  return (
    <div
      className={`flex flex-col place-content-center h-full text-main w-1/2 m-auto`}
    >
      <form
        className="flex flex-col gap-2 items-center justify-center drop-shadow-lg rounded-xl m-auto sm:bg-backdrop h-1/2 w-4/5"
        onSubmit={event => handleSubmit(event)}
      >
        {error && <p className="text-red-600">{error}</p>}
        <TextField
          type="email"
          value={formData.email}
          label="Email"
          onChange={handleChange}
          id="email"
        />

        <PasswordField
          value={formData.password}
          label="Password"
          onChange={handleChange}
          id="password"
        />

        <PasswordField
          value={formData.confirmPassword}
          label="Confirm password"
          onChange={handleChange}
          id="confirmPassword"
        />
        <Button type="submit">Register</Button>

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
