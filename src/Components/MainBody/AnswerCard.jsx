import React, { useState } from 'react';

const AnswerCard = ({ post, onClose }) => {

    const [formData, setFormData] = useState({
        answer: post.answer,
      });
    
    const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSave = async (event) => {
        event.preventDefault();
            try {
          const response = await fetch(`https://66c21aecf83fffcb587b2a9c.mockapi.io/questions/posts/${post.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...post, answer: formData.answer }),
          });
    
          if (!response.ok) {
            throw new Error(`Error updating post: ${response.statusText}`);
          }

          console.log('Post answered successfully!');
          alert('Post answered successfully!!');
          onClose();
        } catch (error) {
          console.error('Error updating post:', error);
          alert('Error!');
        }
      };
    
  return (
    <div className="card bg-light">
      <div className="card-body">
        <div className="card-header">Post Details</div>
        <form onSubmit={handleSave}>
          <div className="row gx-3 mb-3">
            <div className="col-md-6">
              <label className="small mb-1" htmlFor="inputId">id:</label>
              <input className="form-control" id="inputId" type="text" value={post.id} disabled />
            </div>
            <div className="col-md-6">
              <label className="small mb-1" htmlFor="inputLikes">Likes:</label>
              <input className="form-control" id="inputLikes" type="text" value={(post.likes?.length ?? 0)}disabled />
            </div>
          </div>
          <div className="mb-3">
            <label className="small mb-1" htmlFor="inputAnswer">question: </label>
            <input className="form-control" id="inputAnswer" type="text" value={post.question} disabled />
          </div>
          <div className="mb-3">
            <label className="small mb-1" htmlFor="inputanswer">answer: </label>
            <input className="form-control" id="inputanswer" type="text" placeholder="Enter your answer" name="answer" value={formData.answer} onChange={handleChange} />
          </div>
          <div className="d-grid gap-2 d-md-flex flex justify-between mt-3">
            <button className="btn btn-primary me-md-2" type="button" onClick={onClose}>Hủy</button>
            <button className="btn btn-primary" type="submit">Lưu</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnswerCard;