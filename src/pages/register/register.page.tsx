import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useNavigate} from 'react-router-dom';
import {useRegisterMutation} from '../../store/slices/api/user/user.slice';
import {setCredentials} from '../../store/slices/auth/auth.slice';
import {useAppSelector} from '../../store/hooks';
import {useDispatch} from 'react-redux';
import Grid from '../../components/grid/grid.component';
import RegisterForm from '../../components/forms/register/register.form';

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

const Register = () => {
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
  const [registerUser] = useRegisterMutation();

  const onSubmit = async data => {
    const {name, email, password} = data;
    try {
      const res = await registerUser({name, email, password}).unwrap();
      dispatch(setCredentials({...res}));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate('/profile');
    }
  }, [userInfo, navigate]);
  return (
    <Grid>
      <RegisterForm
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
      />
    </Grid>
  );
};

export default Register;
