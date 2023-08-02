import {createSlice} from '@reduxjs/toolkit';
import {IJob} from '../../../types/job.types';

const initialState = {
  jobs: <IJob[]>[],
};

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
    },
    addJob: (state, action) => {
      state.jobs.push(action.payload);
    },
    updateJobArr: (state, action) => {
      const updatedJobs = state.jobs;
      const objId = action.payload._id;
      const objIndex = updatedJobs.findIndex(obj => obj._id == objId);
      updatedJobs[objIndex] = action.payload;
      state.jobs = updatedJobs;
    },
  },
});

export const {setJobs, addJob, updateJobArr} = jobSlice.actions;

export default jobSlice.reducer;
