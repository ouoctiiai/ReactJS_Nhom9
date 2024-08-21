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
import Admin from './Components/Admin/Admin'; // Import Admin component

function App() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch("https://66c075a5ba6f27ca9a56aed0.mockapi.io/questions")
      .then(response => response.json())
      .then(data => setPosts(data));
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>  
      <div>
        <Header onSearch={handleSearch} />
        <Navbar />
        <div className=" bg-cover bg-center">
          <Routes>
            <Route path="/filterquestion" element={<FilterQuestion questions={posts} />} />
            <Route path="/admin" element={<Admin />} /> {/* Route mới cho Admin */}
            <Route path="/" element={<MainBody posts={posts} searchQuery={searchQuery} />} /> 
          </Routes>
        </div>
        <Footer />
      </div>  
    </>
  );
}

export default App;
