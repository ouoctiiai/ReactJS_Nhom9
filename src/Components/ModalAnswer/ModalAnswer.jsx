import React, { useState } from 'react';
import "./ModalAnswer.css"; 

function ModalAnswer({ setOpenModal, post }) {

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
          setOpenModal(false);
          console.log('Post answered successfully!');
          alert('Post answered successfully!!');
        } catch (error) {
          console.error('Error updating post:', error);
          alert('Error!');
        }
      };
    
  return (
    <div className="modalBackground">
      <div className="modalContainer1">
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
          <h1>Respond to question</h1>
        </div>
        <div className="body">
        <form onSubmit={handleSave}>
        <div className="mb-3">
            <input className="form-control" id="inputanswer" type="text" placeholder="Enter your answer" name="answer" value={formData.answer} onChange={handleChange}/>
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

export default ModalAnswer;