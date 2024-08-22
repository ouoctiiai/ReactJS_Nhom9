import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import Post from './post';
import Answer from './answer';
import AddQuestionCard from './AddQuestionCard';
import ModalUpdate from '../ModalUpdate/ModalUpdate';
import ModalAnswer from '../ModalAnswer/ModalAnswer';


export const MainContainer = styled.div`
  background-color: aliceblue;
  
  h2 {
    font-weight: bold;
    font-size: 2rem;
  }
  
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 1em
  }
    
  ul,
  li {
    list-style: none;
  }

  ul li a {
    text-decoration: none;
    color: #000;
    background: #ffc;
    display: inline-block;
    height: auto;
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

const FlashcardContainer = styled.li`
  position: relative;
  width: 12em;
  height: 13em;
  perspective: 1000px;
  margin: 1em;
  z-index: 1;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: rotateY(0deg);

  &.has-answer:hover {
    z-index: 2;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    transform: rotateY(180deg);
  }
`;

const Flashcard = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: rotateY(0deg);

  // .has-answer & {
  //   ${FlashcardContainer}:hover & {
  //     transform: rotateY(180deg);
  //   }
  // }
`;

const FlashcardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #e0e0e0;
  box-shadow: 5px 5px 7px rgba(33, 33, 33, .7);
  padding: 1em;
  backface-visibility: hidden;
`;

const FlashcardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #e0e0e0;
  box-shadow: 5px 5px 7px rgba(33, 33, 33, .7);
  padding: 1em;
  backface-visibility: hidden;
  transform: rotateY(180deg);
`;

export default function MainBody({ posts = [], searchQuery }) {
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [nextId, setNextId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [currentPost, setCurrentPost] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserRole(user.role);
    }
  }, []);

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

  const handleDeletePost = async (postId) => {
    if (!window.confirm(`Are you sure you want to delete this question?`)) {
      return;
    }
    try {
      const response = await fetch(`https://66c075a5ba6f27ca9a56aed0.mockapi.io/questions/${postId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error deleting post: ${response.statusText}`);
      }

      console.log('Post deleted successfully!');
      alert('Post deleted successfully');

      setFilteredPosts((prevFilteredPosts) =>
        prevFilteredPosts.filter((post) => post.id !== postId)
      );
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

      if (searchQuery.trim() === '' || newQuestion.question.toLowerCase().includes(searchQuery.toLowerCase())) {
        setFilteredPosts((prevFilteredPosts) => [...prevFilteredPosts, newQuestion]);
      }

    } catch (error) {
      console.error('Error:', error);
      alert('Error');
    }
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenAS, setModalOpenAS] = useState(false);


  const handleUpdatePost = async(Post)=>{
    setModalOpen(true);
    setCurrentPost(Post);
  }

  const handleAnswerPost = async(Post)=>{
    setModalOpenAS(true);
    setCurrentPost(Post);
  }

  return (
    
    <MainContainer>

      {modalOpen && <ModalUpdate 
      setOpenModal={setModalOpen}
      post={currentPost} />}

      {modalOpenAS && <ModalAnswer 
      setOpenModal={setModalOpenAS}
      post={currentPost} />}
    
      <h3>Questions for the group?</h3>
      <ul className='h-[700px] pt-4 gap-4 overflow-y-scroll '>
        {filteredPosts.map((post) => (
          <FlashcardContainer key={post.id} className={post.answer ? 'has-answer' : ''}>
            <Flashcard>
              <FlashcardFront>
                <Post post={post} onDeletePost={handleDeletePost} userRole={userRole} onUpdatePost={handleUpdatePost} onAnswerPost={handleAnswerPost}/>
              </FlashcardFront>
              <FlashcardBack>
                <Answer post={post} onDeletePost={handleDeletePost} userRole={userRole} onUpdatePost={handleUpdatePost} onAnswerPost={handleAnswerPost}/>
              </FlashcardBack>
            </Flashcard>
          </FlashcardContainer>
        ))}
      </ul>
      <div className='flex justify-between flex-col items-center w-screen mb-2'>
        <h2 >Have new question* </h2>
        <AddQuestionCard onInsertPost={handleInsertPost} />
      </div>
    </MainContainer>
  );
};
