import React, { useState, useEffect } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ItemPage.css';
import Cart from './Cart';

const ItemPage = () => {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8084/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
  };

  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Function to update the cart quantity
  const updateCart = (product, quantityChange) => {
    const updatedCart = cart.map(item => {
      if (item.id === product.id) {
        const newQuantity = item.quantity + quantityChange;
        return {
          ...item,
          quantity: newQuantity > 0 ? newQuantity : 1 // Ensure the quantity doesn't go below 1
        };
      }
      return item;
    });

    setCart(updatedCart);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckout = () => {
    navigate('/billing', { state: { cart } });
  };

  return (
    <div className="item-page">
      <header className="header">
        <h1>Buy Products</h1>
        <SearchBar setSearchTerm={setSearchTerm} />
      </header>
      <div className="main-content">
        <ProductGrid 
          products={filteredProducts} 
          addToCart={addToCart} 
        />
        <Cart cart={cart} updateCart={updateCart} handleCheckout={handleCheckout} />
      </div>
    </div>
  );
};

const SearchBar = ({ setSearchTerm }) => (
  <input
    type="text"
    placeholder="Search products..."
    onChange={(e) => setSearchTerm(e.target.value)}
    className="search-bar"
  />
);

const ProductGrid = ({ products, addToCart }) => (
  <div className="product-grid">
    {products.map(product => (
      <div key={product.id} className="product-card">
        {/* Ensure the image URL is valid */}
        {product.imageUrl && (
          <img src={product.imageUrl} alt={product.name} className="product-image" />
        )}
        <div className="product-details">
          <h2>{product.name}</h2>
          <p>Price: ₹{product.price}</p>
          <p>Rating: {product.rating}★</p>
          <p>Discount: {product.discount}%</p>
        </div>
        <button onClick={() => addToCart(product)} className="add-to-cart-button">
          Add to Cart <FaCartPlus />
        </button>
      </div>
    ))}
  </div>
);

export default ItemPage;
