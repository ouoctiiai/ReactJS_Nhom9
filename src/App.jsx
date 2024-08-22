import React, { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './index.css';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer/Foot';
import MainBody from './Components/MainBody/MainBody';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import FilterQuestion from './Components/FilterQuestion';
import Login from './Components/Signin-Login/Login';
import Home from './Components/Home';

function App() {
  
  return (
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path='/home/*' element={<Home/>}/>
          </Routes>
  )
}

export default App;
