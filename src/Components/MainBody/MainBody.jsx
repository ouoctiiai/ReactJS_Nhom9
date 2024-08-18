import React from 'react'
import Post from './post'
import AddQuestionCard from '../addQuestionCard'
import UpdateQuestionCard from '../UpdateQuestionCard'

export default function MainBody({posts = []}) {
  return (
      <div className="flex flex-col justify-center items-start  overflow-hidden">
        <h1 className=' text-white ml-2'>Questions for the group?</h1>
          <div className='grid grid-cols-4 gap-4 ml-[10%] mt-4 w-[80%] h-[500px] overflow-y-scroll no-scrollbar'>
            { posts.map(post => <Post key={post.id} post={post} />) }
          </div>
          <div className='flex justify-between flex-col items-center w-screen mb-2'>
            <h2 className='text-white'>Have new question* </h2>
              <AddQuestionCard />
          </div>
    </div>
    
  )
}

