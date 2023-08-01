import React from 'react';
import {Link} from 'react-router-dom';

const RegisterForm = ({handleSubmit, onSubmit, register, errors}) => (
  <form
    className="col-span-12 md:col-span-6 md:col-start-4 md:border md:p-4 lg:col-span-4 lg:col-start-5  "
    onSubmit={handleSubmit(onSubmit)}
  >
    <h1 className="text-3xl mb-4">Register</h1>
    <div>
      <label className="block" htmlFor="name">
        Name
      </label>
      <input
        id="name"
        className="border w-full p-2"
        type="text"
        {...register('name', {required: true})}
      />
      <p>{errors && errors.name && errors.name.message}</p>
    </div>
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
    <div>
      <label className="block" htmlFor="">
        Confirm Password
      </label>
      <input
        className="border w-full p-2"
        id="confirmPassword"
        type="password"
        {...register('confirmPassword', {required: true})}
      />
      <p>
        {errors && errors.confirmPassword && errors.confirmPassword.message}
      </p>
    </div>
    <Link className="mt-4 block text-gray-600" to="/login">
      Already have an account?
    </Link>
    <button
      className="w-full block rounded bg-green-500 mt-4 py-2 text-white"
      type="submit"
    >
      Register
    </button>
  </form>
);

export default RegisterForm;
