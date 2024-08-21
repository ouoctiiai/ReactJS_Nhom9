import React, { useEffect, useState } from 'react'
import Header from './Header'
import Navbar from './Navbar'
import Footer from './Footer/Foot'
import { Link, Route, Routes } from 'react-router-dom'
import MainBody from './MainBody/MainBody'
import FilterQuestion from './FilterQuestion'
import Admin from './Admin/Admin'
import AddQuestionCard from './MainBody/AddQuestionCard'

export default function Home() {
    const [posts, setPosts] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [nextId, setNextId] = useState(null);

    useEffect(() => {
        fetch("https://66c075a5ba6f27ca9a56aed0.mockapi.io/questions")
            .then(response => response.json())
            .then(data => setPosts(data))
    }, [])
    const handleSearch = (query) => {
        setSearchQuery(query);
    }

    useEffect(() => {
        const fetchNextId = async () => {
          try {
            const response = await fetch('https://66c075a5ba6f27ca9a56aed0.mockapi.io/questions');
    
            if (!response.ok) {
              throw new Error('Error fetching posts');
            }
    
            const data = await response.json();
            const maxId = Math.max(...data.map(post => post.id));
            setNextId(maxId + 1);
          } catch (error) {
            console.error('Error fetching next ID:', error);
          }
        };
    
        fetchNextId();
      }, [posts]);

    const handleInsertPost = async (question) => {
        debugger;
        if (!question) {
          alert('Vui lòng nhập câu hỏi.');
          return;
        }
    
        const user = JSON.parse(localStorage.getItem('user'));
        const writer = user ? user.username : 'unknown';
    
        const newQuestion = {
          id: nextId,
          question: question,
          likes: [],
          answer: '',
          writer: writer,
          date: new Date().toLocaleDateString(),
        };
    
        try {
          const response = await fetch('https://66c075a5ba6f27ca9a56aed0.mockapi.io/questions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newQuestion),
          });
    
          if (!response.ok) {
            throw new Error('Error');
          }
          console.log('Post inserted successfully!');
          alert('Post inserted successfully!');

        } catch (error) {
          console.error('Error:', error);
          alert('Error');
        }
      };
  return (
    <>
          <div >
              <Header onSearch={handleSearch} />
              <Navbar/>
              <div className=" bg-[url('./image/bg.jpg')]  bg-cover bg-center">    
                  <Routes>
                      <Route path="/admin" element={<Admin />} /> 
                      <Route path="filterquestion" element={<FilterQuestion questions={posts} />} />
                      <Route path="mainbody" element={<MainBody posts={posts} searchQuery={searchQuery} />} />  
                      <Route path="addquestion" element={<AddQuestionCard onInsertPost={handleInsertPost} />} />  
                      </Routes>
              </div>
              <Footer />
          </div>
    </>
  )
}
