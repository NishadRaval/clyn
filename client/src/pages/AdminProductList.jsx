import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './AdminProductList.module.css';
import { API_URL } from '../apiConfig'; // <-- IMPORT

function AdminProductList() {
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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        // --- THIS LINE IS UPDATED ---
        await axios.delete(`${API_URL}/api/products/${id}`);
        setProducts(currentProducts => 
          currentProducts.filter(product => product._id !== id)
        );
        alert('Product deleted successfully!');
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product.');
      }
    }
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div className={styles.adminContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Manage Products</h1>
        <Link to="/admin/product/create" className={styles.createButton}>
          + Create New Product
        </Link>
      </div>

      <table className={styles.productTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>₹{product.price}</td>
              <td>{product.category}</td>
              <td className={styles.actions}>
                <Link 
                  to={`/admin/product/edit/${product._id}`} 
                  className={styles.editButton}
                >
                  Edit
                </Link>
                <button 
                  className={styles.deleteButton}
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProductList;