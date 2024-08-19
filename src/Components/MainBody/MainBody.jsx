import React, { useEffect, useState } from 'react'
import Post from './post'
import AddQuestionCard from './AddQuestionCard'
export default function MainBody() {

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
}

export default function MainBody({ posts = [], searchQuery }) {
  const [filteredPosts, setFilteredPosts] = useState(posts);
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post =>
        post.question.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  }, [posts, searchQuery]);
  return (
    <div className="flex flex-col justify-center items-start  overflow-hidden bg-[url('./image/bg.jpg')]  bg-cover bg-center">
        <h1 className=' text-white ml-2'>Questions for the group?</h1>          
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-[10%] mt-4 w-[80%] h-[500px] overflow-y-scroll no-scrollbar'>
            { filteredPosts.map(post => <Post key={post.id} post={post} onDeletePost={handleDeletePost}/>) }
          </div>
          <div className='flex justify-between flex-col items-center w-screen mb-2'>
            <h2 className='text-white'>Have new question* </h2>
              <AddQuestionCard onInsertPost={handleInsertPost}/>
          </div>
    </div>
    
  )
}