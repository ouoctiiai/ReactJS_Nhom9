import React, { useState } from 'react';

const AddQuestionCard = () => {
  const [question, setQuestion] = useState('');

  const handleCancel = () => {
    setQuestion('');
  };

  const handleSubmit = async () => {
    if (!question) {
      alert('Vui lòng nhập câu hỏi.');
      return;
    }

    const newQuestion = {
      question,
      likes: [],
      answer: '',
    };

    try {
      const response = await fetch('https://66c21aecf83fffcb587b2a9c.mockapi.io/questions/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQuestion),
      });

      if (!response.ok) {
        throw new Error('Đã xảy ra lỗi khi thêm câu hỏi.');
      }

      console.log('Câu hỏi đã được thêm thành công!');
      setQuestion('');
    } catch (error) {
      console.error('Lỗi:', error);
      alert('Đã xảy ra lỗi khi thêm câu hỏi. Vui lòng thử lại.');
    }
  };

  return (
    <div className="card bg-light">
      <div className="card-body">
      <div class="card-header">Ask questions</div>
      <p className="card-text">Hãy đặt những câu hỏi liên quan đến vấn đề thực tập.</p>
        <div className="form-floating">
          <input className="form-control" id="question" placeholder="Enter the question" value={question} onChange={(e) => setQuestion(e.target.value)} />
          <label htmlFor="question">Enter the question:</label>
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
          <button className="btn btn-primary me-md-2" type="button" onClick={handleCancel}>Hủy</button>
          <button className="btn btn-primary" type="button" onClick={handleSubmit}>Gửi</button>
        </div>
      </div>
    </div>
  );
};

export default AddQuestionCard;