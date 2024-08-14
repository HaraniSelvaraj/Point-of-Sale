import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentProcessing.css';

const PaymentProcessing = () => {
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!cardNumber) errors.cardNumber = 'Card number is required';
    if (!expiryDate) errors.expiryDate = 'Expiry date is required';
    if (!cvv) errors.cvv = 'CVV is required';
    if (!cardHolder) errors.cardHolder = 'Card holder\'s name is required';
    return errors;
  };

  const handlePayment = (event) => {
    event.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setPaymentProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setPaymentProcessing(false);
      navigate('/SuccessPage'); // Redirect to a success page or handle payment confirmation
    }, 2000);
  };

  return (
    <div className="main-container">
      <div className="payment-page">
        <h1>Payment Page</h1>
        <form className="payment-form" onSubmit={handlePayment}>
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
          {errors.cardNumber && <p className="error-message">{errors.cardNumber}</p>}

          <label htmlFor="expiryDate">Expiry Date</label>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            placeholder="MM/YY"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
          />
          {errors.expiryDate && <p className="error-message">{errors.expiryDate}</p>}

          <label htmlFor="cvv">CVV</label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
          />
          {errors.cvv && <p className="error-message">{errors.cvv}</p>}

          <label htmlFor="cardHolder">Card Holder's Name</label>
          <input
            type="text"
            id="cardHolder"
            name="cardHolder"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
            required
          />
          {errors.cardHolder && <p className="error-message">{errors.cardHolder}</p>}

          {paymentProcessing ? (
            <p>Processing payment...</p>
          ) : (
            <button type="submit">Make Payment</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default PaymentProcessing;
