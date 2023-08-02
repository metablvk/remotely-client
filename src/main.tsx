import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store/store';
import App from './App';
import './index.css';

// Pages
import Home from './pages/home/home.page';
import Register from './pages/register/register.page';
import Login from './pages/login/login.page';
import Profile from './pages/profile/profile.page';

// Private Route
import PrivateRoute from './components/private-route/private-route.component';
import CreateJob from './pages/job/create-job.page';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" index element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/job" element={<CreateJob />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
