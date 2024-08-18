import React, { useState }  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Delete, Heart, Trash2, Brush  } from 'lucide-react';
import './MainBody.css';
import UpdateQuestionCard from '../UpdateQuestionCard';

export default function Post({ post }) {
    const [showUpdateCard, setShowUpdateCard] = useState(false); 

    const handleUpdateClick = () => {
        setShowUpdateCard(true); 
      };
    
      const handleCloseUpdateCard = () => {
        setShowUpdateCard(false); 
      };
    
    const handleDeletePost = async () => {
        if (!window.confirm(`Are you sure you want to delete the question "${post.question}"?`)) {
          return;
        }
        try {
            const response = await fetch(`https://66c21aecf83fffcb587b2a9c.mockapi.io/questions/posts/${post.id}`, {
            method: 'DELETE',
            });

            if (!response.ok) {
            throw new Error(`Error deleting post: ${response.statusText}`);
            }

            console.log('Post deleted successfully!');
            alert('Post deleted successfully');
        } catch (error) {
          console.error('Error deleting post:', error);
          alert('An error occurred while deleting the post. Please try again later.');
        }
      };

    return (
            <div className="card text" style={{ backgroundColor: 'rgb(172, 53, 53)', color: 'white' }}>
               <div className='flex justify-between'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pin-angle-fill" viewBox="0 0 16 16" style={{ transform: 'rotate(270deg)' }}>
                        <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a6 6 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707s.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a6 6 0 0 1 1.013.16l3.134-3.133a3 3 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146" />
                    </svg>
                    <button type="button" onClick={handleDeletePost}>
                        <Trash2 />
                    </button>
               </div>
               
                <h2>...............</h2>
                <div className="card-body">
                    <h5 className="card-title">{post.question}</h5>
                </div>
                <div className="card-footer flex gap-2" style={{ color: 'white' }}>
                    <Heart />{(post.likes?.length ?? 0)}
                    <button type="button" onClick={handleUpdateClick}>
                        <Brush />
                    </button>
                </div>
                {showUpdateCard && (
                    <UpdateQuestionCard
                    post={post} 
                    onClose={handleCloseUpdateCard} 
                    />
                )}
            </div>
    );
}
