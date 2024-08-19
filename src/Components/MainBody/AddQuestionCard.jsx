import React, { useState } from 'react';

const AddQuestionCard = ({onInsertPost}) => {
  const [question, setQuestion] = useState('');

  const handleCancel = () => {
    setQuestion('');
  };

  return (
    <div className="card bg-light">
      <div className="card-body">
      <div className="card-header">Ask questions</div>
      <p className="card-text">Hãy đặt những câu hỏi liên quan đến vấn đề thực tập.</p>
        <div className="form-floating">
          <input className="form-control" id="question" placeholder="Enter the question" value={question} onChange={(e) => setQuestion(e.target.value)} />
          <label htmlFor="question">Enter the question:</label>
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
          <button className="btn btn-primary me-md-2" type="button" onClick={handleCancel}>Hủy</button>
          <button className="btn btn-primary" type="button" onClick={() => onInsertPost(question)}>Gửi</button>
        </div>
      </div>
    </div>
  );
};

export default AddQuestionCard;