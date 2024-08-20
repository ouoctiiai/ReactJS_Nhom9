import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { FaHeart } from 'react-icons/fa';
import Post from './post';
import { Trash2 } from 'lucide-react';

export const MainContainer = styled.div`
  background-color: aliceblue;
  
  h2 {
    font-weight: bold;
    font-size: 2rem;
  }
  
  p {
    font-size: 1rem;
    font-weight: normal;
    margin-top: 20px
  }
  
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
    
  ul,
  li {
    list-style: none;
  }

  ul li a {
    text-decoration: none;
    color: #000;
    background: #ffc;
    display: block;
    height: 13em;
    width: 12em;
    padding: 1em;
    box-shadow: 5px 5px 7px rgba(33, 33, 33, .7);
    transform: rotate(-6deg);
    transition: transform .15s linear;
  }
  
  ul li {
    margin: 1em;
  }
  
  ul li:nth-child(even) a {
    transform: rotate(4deg);
    position: relative;
    top: 5px;
    background: #cfc;
  }
  
  ul li:nth-child(3n) a {
    transform: rotate(-3deg);
    position: relative;
    top: -5px;
    background: #ccf;
  }
  
  ul li:nth-child(5n) a {
    transform: rotate(5deg);
    position: relative;
    top: -10px;
  }
    
  
`;

const MainBody = () => {

  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetch("https://66c21aecf83fffcb587b2a9c.mockapi.io/questions/posts")
      .then(response => response.json())
      .then(data => setPosts(data))
  }, [])

  const handleDeletePost = async (postId) => {
    if (!window.confirm(`Are you sure you want to delete this question?`)) {
      return;
    }
    try {
      const response = await fetch(`https://66c21aecf83fffcb587b2a9c.mockapi.io/questions/posts/${postId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error deleting post: ${response.statusText}`);
      }

      console.log('Post deleted successfully!');
      alert('Post deleted successfully');

      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('An error occurred while deleting the post. Please try again later.');
    }
  };

  const handleInsertPost = async (question) => {
    if (!question) {
      alert('Vui lòng nhập câu hỏi.');
      return;
    }

    const newQuestion = {
      question: question,
      likes: [],
      answer: '',
    };

    try {
      const response = await fetch('https://66c21aecf83fffcb587b2a9c.mockapi.io/questions/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQuestion),
      });

      if (!response.ok) {
        throw new Error('Error');
      }
      console.log('Post inserted successfully!');
      alert('Post inserted successfully!');

      const updatedPostsResponse = await fetch("https://66c21aecf83fffcb587b2a9c.mockapi.io/questions/posts");
      const updatedPosts = await updatedPostsResponse.json();

      setPosts(updatedPosts);

    } catch (error) {
      console.error('Error:', error);
      alert('Error');
    }
  };


  return (
    <MainContainer>
      <h3>Questions for the group?</h3>
      <ul className='pt-4 gap-4 overflow-y-scroll no-scrollbar'>
        {posts.map((post) => (
          <Post key={post.id} post={post} onDeletePost={handleDeletePost} />
        ))}
      </ul>
    </MainContainer>
  );
};

export default MainBody;
