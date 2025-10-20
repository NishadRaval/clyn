import React from 'react';
import styles from './ProductCard.module.css';
import { Link } from 'react-router-dom'; // <-- 1. IMPORT LINK

function ProductCard({ product }) {
  return (
    // 2. WRAP THE CARD IN A LINK
    <Link to={`/product/${product._id}`} className={styles.linkWrapper}>
      <div className={styles.card}>
        <img 
          src={product.imageUrls[0]} 
          alt={product.name} 
          className={styles.image} 
        />
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.price}>₹{product.price}</p>
        <button className={styles.button}>View Details</button>
      </div>
    </Link>
  );
}

export default ProductCard;