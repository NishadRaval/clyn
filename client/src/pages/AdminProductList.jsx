import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './AdminProductList.module.css'; // We'll create this

function AdminProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch all products when the page loads
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []); // Empty array means run once on load

  // 2. This function will call our DELETE API
  const handleDelete = async (id) => {
    // Ask for confirmation
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        // Call the delete route on our server
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        
        // 3. If successful, UPDATE THE UI by filtering out the deleted product
        // This makes the page update instantly without a full refresh!
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
        {/* We'll build this "create" page next */}
        <Link to="/admin/product/create" className={styles.createButton}>
          + Create New Product
        </Link>
      </div>

      {/* 4. Display all products in a table */}
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
                {/* We'll build this "edit" page next */}
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