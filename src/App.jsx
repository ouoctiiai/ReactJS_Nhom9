import React, { useEffect } from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css';
import './App.css'
import Header from './Components/Header';
import Footer from './Components/Footer/Foot'
import MainBody from './Components/MainBody/MainBody';

function App() {
  return (
    <>  
      <div >
        <Header/>
        <div className=" bg-[url('./image/bg.jpg')]  bg-cover bg-center">
         <MainBody/>
        </div>
        <Footer />
      </div>  
    </>
  )
}
export default App

