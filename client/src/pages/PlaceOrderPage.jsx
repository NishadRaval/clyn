import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './PlaceOrderPage.module.css'; // We'll create this next

function PlaceOrderPage() {
  const { cartItems, shippingAddress, clearCart } = useCart();
  const navigate = useNavigate();

  // --- 1. Calculate Prices ---
  // .toFixed(2) ensures we have two decimal places (e.g., $10.00)
  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const shippingCost = 0.00; // Let's give free shipping for now
  const totalPrice = (subtotal + shippingCost);

  // --- 2. The Big Handler Function ---
  const placeOrderHandler = async () => {
    try {
      // 3. Call our backend API
      const { data } = await axios.post(
        'http://localhost:5000/api/orders',
        {
          orderItems: cartItems, // The items from our cart
          shippingAddress: shippingAddress, // The address from our cart
          totalPrice: totalPrice, // The calculated total
        }
        // We don't need to send the user ID, our 'protect' middleware 
        // on the server gets it from the cookie!
      );

      // 4. If successful:
      clearCart(); // Empty the cart
      alert('Order placed successfully!');
      // We can redirect to an "Order Success" page or "My Orders"
      // For now, let's just go to the homepage
      navigate('/');

    } catch (error) {
      console.error('Failed to place order:', error);
      alert(error.response?.data?.message || 'Failed to place order');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Place Order</h1>
      <div className={styles.layout}>
        {/* --- LEFT COLUMN: Info --- */}
        <div className={styles.leftColumn}>
          {/* Shipping Info */}
          <div className={styles.infoBox}>
            <h2 className={styles.subTitle}>Shipping</h2>
            <p>
              <strong>Address: </strong>
              {shippingAddress.address}, {shippingAddress.city},{' '}
              {shippingAddress.postalCode}, {shippingAddress.country}
            </p>
          </div>

          {/* Order Items */}
          <div className={styles.infoBox}>
            <h2 className={styles.subTitle}>Order Items</h2>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div className={styles.itemsList}>
                {cartItems.map((item) => (
                  <div key={item.cartItemId} className={styles.item}>
                    <img src={item.imageUrls[0]} alt={item.name} className={styles.itemImage} />
                    <span className={styles.itemName}>{item.name} ({item.selectedSize}, {item.selectedColor})</span>
                    <span className={styles.itemPrice}>₹{item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* --- RIGHT COLUMN: Summary --- */}
        <div className={styles.rightColumn}>
          <div className={styles.summaryBox}>
            <h2 className={styles.subTitle}>Order Summary</h2>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>₹{shippingCost.toFixed(2)}</span>
            </div>
            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <button
              className={styles.placeOrderButton}
              disabled={cartItems.length === 0}
              onClick={placeOrderHandler}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderPage;