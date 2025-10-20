import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './ProductDetailPage.module.css';
import { useCart } from '../context/CartContext'; // Import useCart

function ProductDetailPage() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // State for user's selections
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  // Get the addToCart function from our global context
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        const fetchedProduct = response.data;
        setProduct(fetchedProduct);
        
        // Set default selections *after* the product data has loaded
        if (fetchedProduct.sizes && fetchedProduct.sizes.length > 0) {
          setSelectedSize(fetchedProduct.sizes[0]);
        }
        if (fetchedProduct.colors && fetchedProduct.colors.length > 0) {
          setSelectedColor(fetchedProduct.colors[0]);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // Re-run if the 'id' in the URL changes

  // Handler for the button click
  const handleAddToCart = () => {
    // Check if a product is loaded and size/color are selected
    if (product && selectedSize && selectedColor) {
      // Call the global addToCart function
      addToCart(product, selectedSize, selectedColor);
    } else {
      alert('Please wait for the product to load or make a selection.');
    }
  };

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  // Render the page
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={product.imageUrls[0]} alt={product.name} className={styles.image} />
      </div>
      <div className={styles.detailsContainer}>
        <h1 className={styles.name}>{product.name}</h1>
        <p className={styles.price}>₹{product.price}</p>
        <p className={styles.description}>{product.description}</p>
        
        <label className={styles.label}>Size:</label>
        <select 
          className={styles.select}
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          {product.sizes.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
        
        <label className={styles.label}>Color:</label>
        <select 
          className={styles.select}
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
        >
          {product.colors.map(color => (
            <option key={color} value={color}>{color}</option>
          ))}
        </select>
        
        <button 
          className={styles.cartButton}
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetailPage;