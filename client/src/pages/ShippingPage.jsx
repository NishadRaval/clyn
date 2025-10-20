import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from './ShippingPage.module.css'; // We'll create this next

function ShippingPage() {
  const { shippingAddress, saveShippingAddress } = useCart();
  const navigate = useNavigate();

  // Pre-fill form from context, or use empty strings
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the data to our global context
    saveShippingAddress({ address, city, postalCode, country });
    // Go to the final review page
    navigate('/placeorder'); 
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Shipping Address</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>Address:</label>
        <input
          type="text"
          className={styles.input}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <label className={styles.label}>City:</label>
        <input
          type="text"
          className={styles.input}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />

        <label className={styles.label}>Postal Code:</label>
        <input
          type="text"
          className={styles.input}
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
        />

        <label className={styles.label}>Country:</label>
        <input
          type="text"
          className={styles.input}
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />

        <button type="submit" className={styles.submitButton}>
          Continue
        </button>
      </form>
    </div>
  );
}

export default ShippingPage;