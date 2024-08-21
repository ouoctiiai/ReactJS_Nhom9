import React, { useEffect } from 'react'
import { useState } from 'react'
import './index.css';
import './App.css'
import Header from './Components/Header';
import Footer from './Components/Footer/Foot'
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
export default App

