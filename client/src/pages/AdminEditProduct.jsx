import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import styles from './AdminForm.module.css'; // We can reuse the same form CSS!

function AdminEditProduct() {
  const navigate = useNavigate();
  const { id } = useParams(); // 1. Get the product ID from the URL

  // Set up state for all form fields
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [imageUrls, setImageUrls] = useState('');
  const [sizes, setSizes] = useState('');
  const [colors, setColors] = useState('');

  const [loading, setLoading] = useState(true);

  // 2. FETCH THE PRODUCT'S CURRENT DATA
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        
        // 3. Fill the form fields with the data from the database
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setCategory(data.category);
        // Convert arrays back to comma-separated strings for the text boxes
        setImageUrls(data.imageUrls.join(', '));
        setSizes(data.sizes.join(', '));
        setColors(data.colors.join(', '));
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
        alert('Failed to load product data.');
      }
    };
    fetchProduct();
  }, [id]); // Re-run if the ID changes

  // 4. SUBMIT HANDLER (sends a PUT request)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Convert strings back to arrays
      const imageArray = imageUrls.split(',').map(url => url.trim());
      const sizeArray = sizes.split(',').map(s => s.trim());
      const colorArray = colors.split(',').map(c => c.trim());

      const updatedProduct = {
        name,
        description,
        price: Number(price),
        category,
        imageUrls: imageArray,
        sizes: sizeArray,
        colors: colorArray,
      };

      // 5. Send the PUT request to the update route
      await axios.put(`http://localhost:5000/api/products/${id}`, updatedProduct);

      setLoading(false);
      alert('Product updated successfully!');
      navigate('/admin/products'); // Go back to the list

    } catch (error) {
      console.error('Error updating product:', error);
      setLoading(false);
      alert('Failed to update product. Check console.');
    }
  };

  if (loading && !name) {
    return <p>Loading product data...</p>;
  }

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Edit Product</h1>
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
          type_
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
          required 
        />
        
        <label className={styles.label}>Sizes (comma-separated):</label>
        <input 
          type="text"
          className={styles.input}
          value={sizes}
          onChange={(e) => setSizes(e.target.value)}
          required 
        />

        <label className={styles.label}>Colors (comma-separated):</label>
        <input 
          type="text"
          className={styles.input}
          value={colors}
          onChange={(e) => setColors(e.target.value)}
          required 
        />

        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? 'Updating...' : 'Update Product'}
        </button>
      </form>
    </div>
  );
}

export default AdminEditProduct;