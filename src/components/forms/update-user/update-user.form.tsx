import React from 'react';

const UpdateUserForm = ({handleSubmit, onSubmit, register, errors}) => (
  <form className="w-full space-y-2" onSubmit={handleSubmit(onSubmit)}>
    <div className="space-y-1">
      <label className="font-bold block" htmlFor="name">
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
    <div className="space-y-1">
      <label className="font-bold block" htmlFor="email">
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
    <div className="space-y-1">
      <label className="font-bold block" htmlFor="password">
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
    <button
      className="rounded block ml-auto bg-green-500 mt-4 py-2 px-4 text-white"
      type="submit"
    >
      Update
    </button>
  </form>
);

export default UpdateUserForm;
