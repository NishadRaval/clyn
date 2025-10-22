import React from 'react';
import styles from './ProductCard.module.css';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  // Ensure product and imageUrls exist to prevent errors
  if (!product || !product.imageUrls || product.imageUrls.length === 0) {
    return null; // Don't render anything if data is missing
  }

  return (
    <Link to={`/product/${product._id}`} className={styles.linkWrapper}>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <img
            src={product.imageUrls[0]}
            alt={product.name}
            className={styles.image}
            // Add error handling for images
            onError={(e) => { e.target.style.display = 'none'; /* Hide broken image */ }}
          />
        </div>
        <div className={styles.details}>
          <h3 className={styles.name}>{product.name}</h3>
          <p className={styles.price}>₹{product.price}</p>
          <button className={styles.button}>View Details</button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;