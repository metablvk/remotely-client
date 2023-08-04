import {createSlice} from '@reduxjs/toolkit';
import {IJob} from '../../../types/job.types';

const initialState = {
  jobs: <IJob[]>[],
  uJobs: <IJob[]>[],
};

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
    },
    setUJobs: (state, action) => {
      state.uJobs = action.payload;
    },
    addJob: (state, action) => {
      state.jobs.push(action.payload);
    },
    addUJob: (state, action) => {
      state.uJobs.push(action.payload);
    },
    updateJobArr: (state, action) => {
      const updatedJobs = state.jobs;
      const objId = action.payload._id;
      const objIndex = updatedJobs.findIndex(obj => obj._id == objId);
      updatedJobs[objIndex] = action.payload;
      state.jobs = updatedJobs;
    },
    updateUJobArr: (state, action) => {
      const updatedJobs = state.uJobs;
      const objId = action.payload._id;
      const objIndex = updatedJobs.findIndex(obj => obj._id == objId);
      updatedJobs[objIndex] = action.payload;
      state.uJobs = updatedJobs;
    },
  },
});

export const {setJobs, addJob, updateJobArr, updateUJobArr, setUJobs} =
  jobSlice.actions;

export default jobSlice.reducer;
