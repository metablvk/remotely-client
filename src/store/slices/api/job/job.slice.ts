import {apiSlice} from '../api.slice';
const JOB_URL = '/api/jobs';

export const jobsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createJob: builder.mutation({
      query: data => ({
        url: `${JOB_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {useCreateJobMutation} = jobsApiSlice;
