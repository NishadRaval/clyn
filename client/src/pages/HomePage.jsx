import React, { useState, useEffect } from 'react';
import axios from 'axios'; // We'll use this to make API calls
import ProductCard from '../components/ProductCard'; // Import our new component
import styles from './HomePage.module.css'; // Import styles for this page

function HomePage() {
  // 1. Set up state to hold our products
  //    'products' will hold the data, 'setProducts' is the function to update it.
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // To show a "loading" message

  // 2. useEffect runs once when the component loads
  useEffect(() => {
    // Define an async function to fetch data
    const fetchProducts = async () => {
      try {
        // 3. Make a GET request to our backend API
        //    Note: We'll fix this "http://localhost:5000" later with a proxy
        const response = await axios.get('http://localhost:5000/api/products');

        // 4. Update our state with the data from the API
        setProducts(response.data);
        setLoading(false); // We're done loading
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false); // Also stop loading on error
      }
    };

    // Call the function
    fetchProducts();
  }, []); // The empty array [] means "only run this once"

  return (
    <div className={styles.homePage}>
      <h2 className={styles.title}>Featured Products</h2>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        // 5. Map over the 'products' array and render a card for each one
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