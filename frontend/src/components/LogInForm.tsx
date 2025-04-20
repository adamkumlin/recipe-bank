import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react';
import { validateUserCredentials } from '../lib/utils/helper';
import { actions } from 'astro:actions';
import Cookies from 'js-cookie';
import TextField from './TextField';
import Button from './Button';

export default function LogInForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
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
      setError('wrogn!');
    } else {
      Cookies.set('token', data.access_token, { expires: 7 });
      window.location.reload();
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const type = e.target.id;
    setFormData(current => ({ ...current, [type]: e.target.value }));
  }

  return (
    <div
      className={`flex flex-col place-content-center h-full text-white w-1/2 m-auto`}
      id="container"
    >
      <form
        className="flex flex-col gap-2 items-center drop-shadow-lg rounded-xl m-4"
        onSubmit={handleSubmit}
      >
        {error && <p className="text-red-500">{error}</p>}
        <TextField
          type="email"
          value={formData.email}
          label="email"
          onChange={handleChange}
          animateLabels={true}
        />
        <TextField
          type="password"
          value={formData.password}
          label="password"
          onChange={handleChange}
          animateLabels={true}
        />

        <Button type="submit" label="Log in"/>

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
