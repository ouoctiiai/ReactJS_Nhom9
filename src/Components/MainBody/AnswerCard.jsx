import React, { useState } from 'react';

const AnswerCard = ({ post, onClose, onUpdate }) => {

    const [formData, setFormData] = useState({
        answer: post.answer,
      });
    
    const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSave = async (event) => {
        event.preventDefault();
            try {
          const response = await fetch(`https://66c075a5ba6f27ca9a56aed0.mockapi.io/questions/${post.id}`, {
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
          onUpdate(formData.answer);
        } catch (error) {
          console.error('Error updating post:', error);
          alert('Error!');
        }
      };
    
  return (
    <div className="card bg-light">
      <div className="card-body">
        <div className="card-header">Answer</div>
        <form onSubmit={handleSave}>
          <div className="mb-3">
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