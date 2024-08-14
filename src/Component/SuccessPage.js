import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SuccessPage.css';

const SuccessPage = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/ItemPage'); // Redirect to home or another page
  };

  return (
    <div className="success-page">
      <div className="success-message">
        <h1>Payment Successful!</h1>
        <p>Thank you for your payment.</p>
        <button className="back-to-home" onClick={handleBackToHome}>
          Back to Products
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
