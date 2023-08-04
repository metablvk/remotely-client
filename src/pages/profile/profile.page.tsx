import React, {useEffect, useState} from 'react';
import Grid from '../../components/grid/grid.component';
import {useAppSelector} from '../../store/hooks';
import {FaPencilAlt} from 'react-icons/fa';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useUpdateUserMutation} from '../../store/slices/api/user/user.slice';
import {setCredentials} from '../../store/slices/auth/auth.slice';
import {useDispatch} from 'react-redux';
import * as yup from 'yup';
import UpdateUserForm from '../../components/forms/update-user/update-user.form';
import {Link} from 'react-router-dom';

const schema = yup.object().shape({
  name: yup.string(),
  email: yup.string().email(),
  password: yup.string(),
});

const Profile = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();
  const [updateUser] = useUpdateUserMutation();
  const {userInfo} = useAppSelector(state => state.auth);
  const {uJobs} = useAppSelector(state => state.job);

  useEffect(() => {
    reset({
      name: userInfo.name,
      email: userInfo.email,
    });
  }, [userInfo, reset]);
  const onSubmit = async data => {
    const {name, email, password} = data;
    try {
      const res = await updateUser({name, email, password}).unwrap();
      dispatch(setCredentials({...res}));
      setEdit(!edit);
    } catch (err) {
      console.log(err);
    }
  };
  const handleClick = () => setEdit(!edit);

  return (
    <Grid classNames="gap-2 mt-8">
      <div className="mb-2 col-span-12 lg:border lg:col-span-4 lg:p-4">
        <h2>Setting</h2>
      </div>
      <div className="col-span-12 lg:col-span-7 lg:col-start-6 lg:border lg:p-4">
        <div className="flex justify-between">
          <h3 className="font-bold mb-4">Profile Information</h3>
          <FaPencilAlt onClick={handleClick} className="cursor-pointer" />
        </div>
        <div className="space-y-2">
          {edit ? (
            <UpdateUserForm
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              register={register}
              errors={errors}
            />
          ) : (
            <>
              <div className="space-y-1">
                <label htmlFor="" className="font-bold block">
                  Name
                </label>
                <div>{userInfo.name}</div>
              </div>
              <div className="space-y-1">
                <label htmlFor="" className="font-bold block">
                  Email
                </label>
                <div>{userInfo.email}</div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="col-span-12 lg:col-span-7 lg:col-start-6 lg:border lg:p-4">
        <h2>Your Job Postings</h2>
        {uJobs &&
          uJobs.map((job, id) => {
            return (
              <div key={id}>
                <Link to={`/job/${job._id}`}>
                  <h3 className="">{job.title}</h3>
                </Link>
              </div>
            );
          })}
      </div>
    </Grid>
  );
};

export default Profile;
