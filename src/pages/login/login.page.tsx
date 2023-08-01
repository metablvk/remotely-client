import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Link, useNavigate} from 'react-router-dom';
import {useLoginMutation} from '../../store/slices/api/user/user.slice';
import {setCredentials} from '../../store/slices/auth/auth.slice';
import {useAppSelector} from '../../store/hooks';
import {useDispatch} from 'react-redux';
import Grid from '../../components/grid/grid.component';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {userInfo} = useAppSelector(state => state.auth);
  const [loginUser] = useLoginMutation();

  useEffect(() => {
    if (userInfo) {
      navigate('/profile');
    }
  }, [userInfo, navigate]);

  const onSubmit = async data => {
    const {email, password} = data;
    try {
      const res = await loginUser({email, password}).unwrap();
      dispatch(setCredentials({...res}));
      navigate('/profile');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Grid>
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
    </Grid>
  );
};

export default Login;
