import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useNavigate} from 'react-router-dom';
import {useLoginMutation} from '../../store/slices/api/user/user.slice';
import {setCredentials} from '../../store/slices/auth/auth.slice';
import {useAppSelector} from '../../store/hooks';
import {useDispatch} from 'react-redux';
import Grid from '../../components/grid/grid.component';
import LoginForm from '../../components/forms/login/login.form';

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
      <LoginForm
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
      />
    </Grid>
  );
};

export default Login;
