import React, {useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/navbar.component';
import {
  useGetAllJobsQuery,
  useGetJobsByUIdQuery,
} from './store/slices/api/job/job.slice';
import {useAppDispatch, useAppSelector} from './store/hooks';
import {setJobs, setUJobs} from './store/slices/job/job.slice';
function App() {
  const {userInfo} = useAppSelector(state => state.auth);
  const {data: jobs} = useGetAllJobsQuery();
  const {data: uJobs} = useGetJobsByUIdQuery(userInfo && userInfo._id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setJobs(jobs));
    dispatch(setUJobs(uJobs));
  }, [jobs, uJobs, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
