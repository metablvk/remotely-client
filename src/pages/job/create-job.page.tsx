import React from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useCreateJobMutation} from './../../store/slices/api/job/job.slice';
import * as yup from 'yup';
import Grid from '../../components/grid/grid.component';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const schema = yup.object().shape({
  title: yup.string().required(),
  payType: yup.string().required(),
  payRate: yup.string().required(),
});

const CreateJob = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const [jobDesc, setJobDesc] = useState('');
  const [jobDescErr, setJobDescErr] = useState('');
  const [createJob] = useCreateJobMutation();

  const onSubmit = async data => {
    const {title, payType, payRate} = data;
    console.log(data);
    if (data && jobDesc.length > 0) {
      try {
        const res = await createJob({
          title,
          payType,
          payRate,
          jobDesc,
        }).unwrap();
        if (res) {
          navigate('/');
          setJobDescErr('');
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setJobDescErr('Job description cannot be blank');
    }
  };
  return (
    <Grid>
      <div className="col-span-12 md:col-span-8 md:col-start-3">
        <h1 className="mb-4 text-lg font-bold tracking-wide">Create Job</h1>
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
            <ReactQuill theme="snow" value={jobDesc} onChange={setJobDesc} />
            <p>
              {Object.keys(errors).length > 0 && jobDesc.length === 0 ? (
                <p>Job Description cannot be blank</p>
              ) : jobDescErr ? (
                jobDescErr
              ) : null}
            </p>
          </div>
          <button
            className="rounded block ml-auto bg-green-500 mt-4 py-2 px-4 text-white"
            type="submit"
          >
            Create Job
          </button>
        </form>
      </div>
    </Grid>
  );
};

export default CreateJob;
