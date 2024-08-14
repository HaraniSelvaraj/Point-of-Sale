import React, { useEffect, useState } from 'react';
import './Carousel.css';

const Carousel = () => {
  const images = ['image-0', 'image-1', 'image-2'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoPlayInterval = 3000; // Auto-play interval in milliseconds

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, autoPlayInterval);
    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [images.length]);

  return (
    <div className="carousel">
      <button
        onClick={() =>
          setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1)
        }
        className="carousel-button"
      >
        &lt;
      </button>
      <div className={`carousel-image ${images[currentIndex]}`}></div>
      <button
        onClick={() => setCurrentIndex((currentIndex + 1) % images.length)}
        className="carousel-button"
      >
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
