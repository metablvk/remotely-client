import React, {useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/navbar.component';
import {useGetAllJobsQuery} from './store/slices/api/job/job.slice';
import {useAppDispatch} from './store/hooks';
import {setJobs} from './store/slices/job/job.slice';
function App() {
  const {data} = useGetAllJobsQuery();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setJobs(data));
  }, [data, dispatch]);
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
