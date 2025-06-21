import { useState } from 'react';
import { validateUserCredentials } from '../lib/utils/helper';
import { actions } from 'astro:actions';
import Cookies from 'js-cookie';
import TextField from './TextField';
import Button from './Button';
import PasswordField from './PasswordField';

export default function LogInForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validation = validateUserCredentials(formData, false);
    if (validation !== '') {
      setError(validation);
      return;
    }

    const json: string = JSON.stringify(formData);

    const { data } = await actions.logIn(json);

    // If an error occurred, display it
    if (!data) {
      setError('fel!');
    } else {
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
      className={
        'flex flex-col place-content-center h-full text-main w-1/2 m-auto'
      }
    >
      <form
        className="flex flex-col gap-2 items-center justify-center drop-shadow-lg rounded-xl m-auto sm:bg-backdrop h-1/2 w-4/5"
        onSubmit={handleSubmit}
      >
        {error && <p className="text-red-500">{error}</p>}
        <TextField
          type="email"
          value={formData.email}
          label="email"
          onChange={handleChange}
        />
        <PasswordField
          value={formData.password}
          label="password"
          onChange={handleChange}
        />
        <Button
          type="submit"
          label="Log in"
          style="rounded-lg text-main bg-blue-600 m-2 sm:w-1/4 py-2 mb-4 hover:scale-110 text-2xl w-full"
        />

        <a
          href="/register"
          className="text-blue-500 border-t-2 border-white border-dashed pt-2 hover:text-blue-200"
        >
          Don't have an account?
        </a>
      </form>
    </div>
  );
}
