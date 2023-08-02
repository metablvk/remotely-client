import {apiSlice} from '../api.slice';
const JOB_URL = '/api/jobs';
import {IJob} from '../../../../types/job.types';

export const jobsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createJob: builder.mutation({
      query: data => ({
        url: `${JOB_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    getJob: builder.query({
      query: id => `${JOB_URL}/${id}`,
    }),
    getAllJobs: builder.query<IJob[], void>({
      query: () => `${JOB_URL}`,
    }),
    updateJob: builder.mutation({
      query: data => ({
        url: `${JOB_URL}/${data._id}`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateJobMutation,
  useUpdateJobMutation,
  useGetJobQuery,
  useGetAllJobsQuery,
} = jobsApiSlice;
