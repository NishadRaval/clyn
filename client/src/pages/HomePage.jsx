import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import styles from './HomePage.module.css';
import { API_URL } from '../apiConfig';
import Loader from '../components/Loader';

function HomePage() {
  const [allProducts, setAllProducts] = useState([]); // Store all fetched products
  const [filteredProducts, setFilteredProducts] = useState([]); // Products to display
  const [categories, setCategories] = useState([]); // Unique categories
  const [selectedCategory, setSelectedCategory] = useState('All'); // Track selected filter
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/api/products`);
        const fetchedProducts = response.data;
        setAllProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts); // Initially show all

        // --- Extract Unique Categories ---
        // Use a Set to automatically handle uniqueness
        const uniqueCategories = ['All', ...new Set(fetchedProducts.map(p => p.category))];
        setCategories(uniqueCategories);
        // --- End Category Extraction ---

        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // --- Function to handle category selection ---
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredProducts(allProducts); // Show all if 'All' is clicked
    } else {
      // Filter products based on the selected category
      setFilteredProducts(allProducts.filter(p => p.category === category));
    }
  };
  // --- End Category Handling ---

  return (
    <div className={styles.homePage}>
      {/* --- Category Filter Section --- */}
      <div className={styles.categoryFilters}>
        {categories.map((category) => (
          <button
            key={category}
            className={`${styles.categoryButton} ${selectedCategory === category ? styles.active : ''}`}
            onClick={() => handleCategorySelect(category)}
          >
            {category}
          </button>
        ))}
      </div>
      {/* --- End Category Filter Section --- */}

      <h2 className={styles.featuredTitle}>
        {selectedCategory === 'All' ? 'Featured Products' : `${selectedCategory}`}
      </h2>
      
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.productGrid}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p>No products found in this category.</p> // Message if category is empty
          )}
        </div>
      )}
    </div>
  );
}

export default HomePage;