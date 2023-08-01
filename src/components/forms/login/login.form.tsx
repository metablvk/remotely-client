import React from 'react';
import {Link} from 'react-router-dom';

const LoginForm = ({handleSubmit, onSubmit, register, errors}) => (
  <form
    className="col-span-12 md:col-span-6 md:col-start-4 md:border md:p-4 lg:col-span-4 lg:col-start-5  "
    onSubmit={handleSubmit(onSubmit)}
  >
    <h1 className="text-3xl mb-4">Login</h1>
    <div>
      <label className="block" htmlFor="email">
        Email
      </label>
      <input
        id="email"
        className="border w-full p-2"
        type="text"
        {...register('email', {required: true})}
      />
      <p>{errors && errors.email && errors.email.message}</p>
    </div>
    <div>
      <label className="block" htmlFor="password">
        Password
      </label>
      <input
        id="password"
        className="border w-full p-2"
        type="password"
        {...register('password', {required: true})}
      />
      <p>{errors && errors.password && errors.password.message}</p>
    </div>
    <Link className="mt-4 block text-gray-600" to="/register">
      Don't have an account?
    </Link>
    <button
      className="w-full block rounded bg-green-500 mt-4 py-2 text-white"
      type="submit"
    >
      Login
    </button>
  </form>
);

export default LoginForm;
