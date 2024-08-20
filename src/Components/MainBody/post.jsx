import React, { useState }  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Trash2, Heart, Brush, MessageCircleReply, User  } from 'lucide-react';
import './MainBody.css';
import UpdateQuestionCard from './UpdateQuestionCard';
import AnswerCard from './AnswerCard';

export default function Post({ post, onDeletePost }) {
    const [likes, setLikes] = useState(post.likes ?? []); 
    const [hasLiked, setHasLiked] = useState(post.likes?.includes('andanh') ?? false); 
    const [showUpdateCard, setShowUpdateCard] = useState(false); 
    const [showAnswerCard, setShowAnswerCard] = useState(false); 

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
            const index = newLikes.indexOf('andanh');
            if (index > -1) {
                newLikes.splice(index, 1);
            }
        } else {
            // Nếu chưa thích, thêm thích
            newLikes.push('andanh');
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
            <div className="card w-[1vm]" style={{ backgroundColor: 'rgb(172, 53, 53)', color: 'white' }}>
               <div className='flex justify-between ml-2'>
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pin-angle-fill" viewBox="0 0 16 16" style={{ transform: 'rotate(270deg)' }}>
                  <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a6 6 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707s.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a6 6 0 0 1 1.013.16l3.134-3.133a3 3 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146" />
                </svg>
                
                <div className='flex gap-2'>
                  <User /><h5>{post.writer}</h5>
                </div>
                <i>{post.date}</i>
                </div>
                    
                    <button type="button" onClick={() => onDeletePost(post.id)}>
                        <Trash2 />
                    </button>
               </div>
               
               <h2>...............</h2>
            <div className="card-body">
                <h5 className="card-title">{post.question}</h5>
            </div>
            <div className="card-footer flex gap-2" style={{ color: 'white' }}>
                <button type="button" onClick={handleLikeClick} style={{ background: 'none', border: 'none' }}>
                    <Heart style={{ color: hasLiked ? 'red' : 'gray' }} />
                </button>
                {likes.length} 
                <button type="button" onClick={handleUpdateClick}>
                    <Brush />
                </button>
                <button type="button" onClick={handleAnswerClick}>
                    <MessageCircleReply />
                </button>
            </div>
            {showUpdateCard && (
                <UpdateQuestionCard
                    post={post} 
                    onClose={handleCloseUpdateCard} 
                />
            )}
            {showAnswerCard && (
                <AnswerCard
                    post={post} 
                    onClose={handleCloseAnswerCard} 
                />
            )}
        </div>
    );
}