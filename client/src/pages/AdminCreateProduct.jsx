import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // We use this to redirect the user
import styles from './AdminForm.module.css'; // We'll create a *reusable* form style

function AdminCreateProduct() {
  const navigate = useNavigate(); // This hook lets us change pages

  // 1. Set up state for every single field in our form
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('T-Shirts');
  
  // For 'imageUrls', 'sizes', and 'colors', we'll just use a comma-separated string
  // It's simpler to manage in a text box.
  const [imageUrls, setImageUrls] = useState('');
  const [sizes, setSizes] = useState('');
  const [colors, setColors] = useState('');

  const [loading, setLoading] = useState(false);

  // 2. This function runs when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop the page from refreshing
    setLoading(true);

    try {
      // 3. Convert our comma-separated strings into arrays
      const imageArray = imageUrls.split(',').map(url => url.trim());
      const sizeArray = sizes.split(',').map(s => s.trim());
      const colorArray = colors.split(',').map(c => c.trim());

      // 4. Create the new product object
      const newProduct = {
        name,
        description,
        price: Number(price), // Make sure price is a number
        category,
        imageUrls: imageArray,
        sizes: sizeArray,
        colors: colorArray,
      };

      // 5. Send it to the backend API!
      await axios.post('http://localhost:5000/api/products', newProduct);

      setLoading(false);
      alert('Product created successfully!');
      
      // 6. Redirect the admin back to the product list
      navigate('/admin/products');

    } catch (error) {
      console.error('Error creating product:', error);
      setLoading(false);
      alert('Failed to create product. Check console for details.');
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Create New Product</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        
        <label className={styles.label}>Product Name:</label>
        <input 
          type="text"
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required 
        />
        
        <label className={styles.label}>Description:</label>
        <textarea 
          className={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        
        <label className={styles.label}>Price:</label>
        <input 
          type="number"
          className={styles.input}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required 
        />
        
        <label className={styles.label}>Category:</label>
        <input 
          type="text"
          className={styles.input}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required 
        />

        <label className={styles.label}>Image URLs (comma-separated):</label>
        <input 
          type="text"
          className={styles.input}
          value={imageUrls}
          onChange={(e) => setImageUrls(e.target.value)}
          placeholder="https://url1.jpg, https://url2.jpg"
          required 
        />
        
        <label className={styles.label}>Sizes (comma-separated):</label>
        <input 
          type="text"
          className={styles.input}
          value={sizes}
          onChange={(e) => setSizes(e.target.value)}
          placeholder="S, M, L, XL"
          required 
        />

        <label className={styles.label}>Colors (comma-separated):</label>
        <input 
          type="text"
          className={styles.input}
          value={colors}
          onChange={(e) => setColors(e.target.value)}
          placeholder="Black, White, Red"
          required 
        />

        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? 'Creating...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
}

export default AdminCreateProduct;