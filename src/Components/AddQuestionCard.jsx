import React from 'react'

const AddQuestionCard = () => {
  return (
      <div className="card bg-light">
        <div className="card-body">
          <h5 className="card-title">Tạo câu hỏi mới</h5>
          <p className="card-text">Hãy đặt những câu hỏi liên quan đến vấn đề thực tập.</p>
          <div className="form-floating mb-3">
            <input className="form-control" id="name" placeholder="Nhập họ tên"/>
            <label htmlFor="name">Tên:</label>
          </div>
          <div className="form-floating">
            <input className="form-control" id="question" placeholder="nhập câu hỏi"/>
            <label htmlFor="question">Nhập câu hỏi:</label>
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
            <button className="btn btn-primary me-md-2" type="button">Hủy</button>
            <button className="btn btn-primary" type="button">Gửi</button>
          </div>
        </div>
      </div>
  );
};

export default AddQuestionCard;