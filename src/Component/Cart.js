import React from 'react';
import './Cart.css';

const Cart = ({ cart, updateCart, handleCheckout }) => {
  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ).toFixed(2);
  };

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.imageUrl} alt={item.name} />
                <div className="item-details">
                  <p>{item.name}</p>
                  <p>₹{item.price.toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button onClick={() => updateCart(item, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateCart(item, 1)}>+</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <h3>Total: ₹{calculateTotal()}</h3>
            <button onClick={handleCheckout}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
