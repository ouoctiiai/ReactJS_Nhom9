import React, { useEffect, useState } from 'react'
import Header from './Header'
import Navbar from './Navbar'
import Footer from './Footer/Foot'
import { Link, Route, Routes } from 'react-router-dom'
import MainBody from './MainBody/MainBody'
import FilterQuestion from './FilterQuestion'
import YourQuestion from './MainBody/YourQuestion'

export default function Home() {
    const [posts, setPosts] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [user, setUser] = useState({});
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser); // Lấy user từ localStorage
        
        fetch("https://66c075a5ba6f27ca9a56aed0.mockapi.io/questions")
            .then(response => response.json())
            .then(data => setPosts(data))
    }, [])
    const handleSearch = (query) => {
        setSearchQuery(query);
    }

  return (
        
    <>
          <div >
              <Header onSearch={handleSearch} />
              <Navbar/>
              <div className="">
                  <Routes>
                      <Route path="filterquestion" element={<FilterQuestion questions={posts} />} />
                      <Route path="mainbody" element={<MainBody posts={posts} searchQuery={searchQuery} />} />
                      <Route path="yourquestion" element={<YourQuestion questions={posts} writer={user.username} />} />
                 </Routes>
              </div>
              <Footer />
          </div>
    </>
  )
}
