import React from 'react';
import {Outlet} from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/navbar.component';

function App() {
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
