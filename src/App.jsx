import React from 'react'
import AddQuestionCard from './Components/addQuestionCard';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css';
import './App.css'
import Header from './Components/Header';

function App() {
  return (
    <>  
      <div >
        <Header/>
      <div >
        content
      </div>
      <div>Footer</div>
      </div>      
      <AddQuestionCard />
    </>
  )
}
export default App

