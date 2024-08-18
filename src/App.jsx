import React from 'react'
import AddQuestionCard from './Components/addQuestionCard';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css';
import './App.css'
import Header from './Components/Header';
import MainBody from './Components/MainBody/MainBody'
import Footer from './Components/Footer/Foot'
import Login from './Components/Signin-Login/Login';

function App() {
  return (
    <>
      {/* <div >
        <Header />
        <div>
          <MainBody />
          <AddQuestionCard />
        </div>
        <Footer />
      </div> */}
      <Login/>
    </>
  )
}
export default App

