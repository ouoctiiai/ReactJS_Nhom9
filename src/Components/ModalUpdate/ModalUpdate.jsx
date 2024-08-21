import React, { useState } from 'react';
import "./UpdateQuestionCard.css"; 

function ModalUpdate({ setOpenModal, post }) {

    const [formData, setFormData] = useState({
        question: post.question,
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
            body: JSON.stringify({ ...post, question: formData.question }),
          });
    
          if (!response.ok) {
            throw new Error(`Error updating post: ${response.statusText}`);
          }
          setOpenModal(false);
          console.log('Post updated successfully!');
          alert('Post updated successfully!');
        } catch (error) {
          console.error('Error updating post:', error);
          alert('Error!');
        }
      };
    
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1> Post Detail</h1>
        </div>
        <div className="body">
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
            <label className="small mb-1" htmlFor="inputQuestion">Question: </label>
            <input className="form-control" id="inputQuestion" type="text" placeholder="Enter your question" name="question" value={formData.question} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="small mb-1" htmlFor="inputAnswer">Answer: </label>
            <input className="form-control" id="inputAnswer" type="text" value={post.answer} disabled />
          </div>
          <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button className="btn btn-primary" type="submit">Save changes</button>
          </div>
        </form>        
        </div>
        </div>
    </div>
  );
}

export default ModalUpdate;