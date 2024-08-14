import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './BillingPage.css';

const BillingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = location.state || { cart: [] }; // Default to an empty cart if state is undefined

  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const handleCheckout = () => {
    // Simulate payment processing
    setPaymentProcessing(true);

    // Simulate successful payment after 2 seconds
    setTimeout(() => {
      setPaymentProcessing(false);
      navigate('/PaymentProcessing'); // Redirect to a success page or handle payment confirmation
    }, 2000);
  };

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="main-container">
      <div className="billing-page">
        <h1>Billing Page</h1>
        <div className="cart-details">
          <h2>Cart Items</h2>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - ₹{item.price} x {item.quantity}
              </li>
            ))}
          </ul>
          <p>Total: ₹{totalAmount.toFixed(2)}</p>
        </div>
        <div className="checkout-section">
          {paymentProcessing ? (
            <p>Processing payment...</p>
          ) : (
            <Link to="/PaymentProcessing"><button className="checkout-button" onClick={handleCheckout}>
              Checkout
            </button></Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
