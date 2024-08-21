import React, { useEffect, useState } from 'react'
import Header from './Header'
import Navbar from './Navbar'
import Footer from './Footer/Foot'
import { Link, Route, Routes } from 'react-router-dom'
import MainBody from './MainBody/MainBody'
import FilterQuestion from './FilterQuestion'

export default function Home() {
    const [posts, setPosts] = useState([])
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
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
              <div className=" bg-[url('./image/bg.jpg')]  bg-cover bg-center">
                  
                  <Routes>
                      <Route path="filterquestion" element={<FilterQuestion questions={posts} />} />
                      <Route path="mainbody" element={<MainBody posts={posts} searchQuery={searchQuery} />} />
                 </Routes>
              </div>

              <Footer />
          </div>
    </>
  )
}
