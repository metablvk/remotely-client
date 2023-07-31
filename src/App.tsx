import React from 'react';
import {Outlet} from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/navbar.component';

function App() {
  return (
    <div>
      <Navbar />
      <div className="container grid grid-cols-12 mt-8">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
