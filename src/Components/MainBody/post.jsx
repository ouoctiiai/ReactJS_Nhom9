import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Trash2, Heart, Brush, User, MessageCircleReply } from 'lucide-react';
import styled from 'styled-components';
import { FaHeart } from 'react-icons/fa';
import AnswerCard from './AnswerCard';
// import './MainBody.css';
import UpdateQuestionCard from './UpdateQuestionCard';

const PostContainer = styled.li`

p {
    font-size: 1rem;
    font-weight: normal;
  }
  .pin-icon{
    position: absolute;
    top: -18px;
    left: -15px;
    margin: 5px
  }

.icon-container {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    margin: 5px;
}
    .heart-item{
      margin-right: 5px;
    }

    .heart-quantity{
      font-size: 16px;
      margin-right: 5px
    }


    .trash-icon{
      position: absolute;
      top: 0;
      right: 0;
      margin: 5px
    }

    .dot-line{
      position: absolute;
      top: 15px;
      width: 10px;
      height: 10px;
      background-color: black;
      border-radius: 50%;
      // box-shadow: 0 0 0 2px #999;
    }

    .dot-line:nth-child(2){
      left: 60px;
    }

    .dot-line:nth-child(3){
      left: 90px;
    }

    .dot-line:nth-child(4){
      left: 120px
    }

    .date-text{
        position: absolute;
        bottom: 0;
        right: 0;
        margin: 5px
    }
`;

export default function Post({ post, onDeletePost, userRole }) {
    const user = JSON.parse(localStorage.getItem('user'));
    const currentUsername = user ? user.username : '';
    
    const [likes, setLikes] = useState(post.likes ?? []);
    const [hasLiked, setHasLiked] = useState(post.likes?.includes(currentUsername) ?? false);
    const [showUpdateCard, setShowUpdateCard] = useState(false);
    const [showAnswerCard, setShowAnswerCard] = useState(false);
    const [data, setData] = useState(post);
    const [userLike, setUserLike]=useState(false);

    const handleUpdateDataQS = (question) => {
        const newData = { ...data };
        newData.question = question;
        setData(newData);
    }

    const handleUpdateDataAS = (answer) => {
        const newData = { ...data };
        newData.answer = answer;
        setData(newData);
    }

    const handleUpdateClick = () => {
        setShowUpdateCard(true);
    };

    const handleCloseUpdateCard = () => {
        setShowUpdateCard(false);
    };

    const handleAnswerClick = () => {
        setShowAnswerCard(true);
    };

    const handleCloseAnswerCard = () => {
        setShowAnswerCard(false);
    };

    const handleLikeClick = async () => {
        const newLikes = [...likes];
        const liked = hasLiked;


        if (liked) {
            // Nếu đã thích, bỏ thích
            const index = newLikes.indexOf(currentUsername);
            if (index > -1) {
                newLikes.splice(index, 1);
            }
        } else {
            // Nếu chưa thích, thêm thích
            newLikes.push(currentUsername);
        }

        try {
            // Cập nhật số lượt thích trên server
            const response = await fetch(`https://66c075a5ba6f27ca9a56aed0.mockapi.io/questions/${post.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...post, likes: newLikes }), // Cập nhật số lượt thích mới
            });

            if (!response.ok) {
                throw new Error(`Error updating likes: ${response.statusText}`);
            }

            setLikes(newLikes);
            setHasLiked(!liked);

            console.log('Likes updated successfully!');
        } catch (error) {
            console.error('Error updating likes:', error);
            alert('An error occurred while updating likes. Please try again later.');
        }
    };

    return (
        <PostContainer>
            <a>
                <span className='pin-icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pin-angle-fill" viewBox="0 0 16 16" transform="rotate(270)">
                        <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a6 6 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707s.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a6 6 0 0 1 1.013.16l3.134-3.133a3 3 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146" />
                    </svg>
                </span>
                <div className='flex gap-2'>
                    <User /><h7>{data.writer}</h7>
                </div>
                {(userRole === 'admin' || (userRole === 'intern' && data.writer === currentUsername)) && (
                    <span className='trash-icon'>
                        <button onClick={() => onDeletePost(data.id)}>
                            <Trash2 />
                        </button>
                    </span>
                )}
                <hr style={{ margin: '10px', border: '0.15px solid black', opacity: '.8' }} />
                <p>{data.question}</p>
                <div className='icon-container'>
                    <span className='heart-item'>
                        <button type="button" onClick={handleLikeClick} style={{ background: 'none', border: 'none' }}>
                            <FaHeart style={{ color: hasLiked ? 'red' : 'gray' }} />
                        </button>
                    </span>
                    <span className='heart-quantity'>{likes.length}</span>
                    {userRole === 'intern' && (
                        <span className='brush-item'>
                            <button type="button" onClick={handleUpdateClick}>
                                <Brush />
                            </button>
                        </span>
                    )}
                    {userRole === 'admin' && (
                        <span className='reply-item'>
                            <button type="button" onClick={handleAnswerClick}>
                                <MessageCircleReply />
                            </button>
                        </span>
                    )}
                </div>
                <span className='date-text' style={{ fontSize: '12px' }}>
                    <h7>{data.date}</h7>
                </span>
                {showUpdateCard && (
                    <UpdateQuestionCard
                        post={post}
                        onClose={handleCloseUpdateCard}
                        onUpdatePost={handleUpdatePost}
                    />
                )}
                {showAnswerCard && (
                    <AnswerCard
                        post={post}
                        onClose={handleCloseAnswerCard}
                        onUpdate={handleUpdateDataAS}
                    />
                )}
            </a>
        </PostContainer>
    );
}