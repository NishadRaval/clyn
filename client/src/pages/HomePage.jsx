import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import styles from './HomePage.module.css';
import { API_URL } from '../apiConfig'; // <-- IMPORT

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // --- THIS LINE IS UPDATED ---
        const response = await axios.get(`${API_URL}/api/products`);
        
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className={styles.homePage}>
      <h2 className={styles.title}>Featured Products</h2>
      
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className={styles.productGrid}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;