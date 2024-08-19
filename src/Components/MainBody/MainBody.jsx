import React, { useEffect, useState } from 'react'
import Post from './post'
import AddQuestionCard from '../addQuestionCard'
import UpdateQuestionCard from '../UpdateQuestionCard'

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
            { filteredPosts.map(post => <Post key={post.id} post={post} />) }
          </div>
          <div className='flex justify-between flex-col items-center w-screen mb-2'>
            <h2 className='text-white'>Have new question* </h2>
              <AddQuestionCard />
          </div>
    </div>
    
  )
}

