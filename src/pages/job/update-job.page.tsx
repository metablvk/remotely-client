import React, {useEffect} from 'react';
import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import * as yup from 'yup';
import Grid from '../../components/grid/grid.component';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import {useUpdateJobMutation} from '../../store/slices/api/job/job.slice';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {updateJobArr, updateUJobArr} from '../../store/slices/job/job.slice';

const schema = yup.object().shape({
  title: yup.string().required(),
  payType: yup.string().required(),
  payRate: yup.string().required(),
});

const UpdateJob = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });
  const {userInfo} = useAppSelector(state => state.auth);
  const {id} = useParams(); // job id
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [desc, setDesc] = useState('');
  const [descErr, setDescErr] = useState('');
  const [updateJob] = useUpdateJobMutation();
  const {uJobs} = useAppSelector(state => state.job);

  // TODO: create its own component to handle this logic
  useEffect(() => {
    const job = uJobs.filter(job => job._id === id)[0];
    if (job.createdBy !== userInfo._id) {
      navigate('/');
    } else {
      console.log('authorized');
    }
  }, [uJobs, id, userInfo, navigate]);
  useEffect(() => {
    if (uJobs && userInfo) {
      const job = uJobs.filter(job => job._id === id)[0];
      if (job && userInfo) {
        reset({
          title: job.title,
          payType: job.payType,
          payRate: job.payRate,
        });
        setDesc(job.desc);
      }
    }
  }, [reset, uJobs, id, navigate, userInfo]);

  const onSubmit = async data => {
    const {title, payType, payRate} = data;
    if (data && desc.length > 0) {
      try {
        const res = await updateJob({
          _id: id,
          title,
          payType,
          payRate,
          desc,
        }).unwrap();
        if (res) {
          dispatch(updateJobArr(res));
          dispatch(updateUJobArr(res));
          navigate('/profile');
          setDescErr('');
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setDescErr('Job description cannot be blank');
    }
  };
  return (
    <Grid>
      <div className="col-span-12 md:col-span-8 md:col-start-3">
        <h1 className="mb-4 text-lg font-bold tracking-wide">Edit Job</h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="title" className="block mb-2">
              Title
            </label>
            <input
              className="border w-full p-2"
              type="text"
              placeholder="Job Title"
              {...register('title', {required: true})}
            />
            <p>{errors && errors.title && errors.title.message}</p>
          </div>
          <div>
            <label htmlFor="payType" className="block mb-2">
              Pay Type
            </label>
            <select
              className="border w-full p-2"
              {...register('payType', {required: true})}
            >
              <option value=""></option>
              <option value="hourly">Hourly</option>
              <option value="fixed price">Fixed Price</option>
            </select>
            <p>{errors && errors.payType && errors.payType.message}</p>
          </div>
          <div>
            <label htmlFor="" className="block mb-2">
              Pay Rate
            </label>
            <input
              className="border w-full p-2"
              type="text"
              {...register('payRate', {required: true})}
            />
            <p>{errors && errors.payRate && errors.payRate.message}</p>
          </div>
          <div>
            <label htmlFor="" className="block mb-2">
              Job Description
            </label>
            <ReactQuill theme="snow" value={desc} onChange={setDesc} />
            <p>
              {Object.keys(errors).length > 0 && desc.length === 0 ? (
                <p>Job Description cannot be blank</p>
              ) : descErr ? (
                descErr
              ) : null}
            </p>
          </div>
          <button
            className="rounded block ml-auto bg-green-500 mt-4 py-2 px-4 text-white"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </Grid>
  );
};

export default UpdateJob;
