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
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetch("https://66c075a5ba6f27ca9a56aed0.mockapi.io/questions")
      .then(response => response.json())
      .then(data => setPosts(data))
  }, [])
  return (
    <>  
      <div >
        <Header/>
        <div className=" bg-[url('./image/bg.jpg')]  bg-cover bg-center">
         <MainBody posts = {posts}/>
          
        </div>
        <Footer />
      </div>  
    </>
  )
}
export default App

