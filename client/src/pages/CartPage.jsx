import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import styles from './CartPage.module.css';

function CartPage() {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate(); // 2. Initialize it

  // 3. Calculate the total price
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  // 4. Handler for the checkout button
  const checkoutHandler = () => {
    navigate('/shipping'); // Just redirects to the shipping page
  };

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.title}>Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className={styles.emptyCart}>
          <p>Your cart is currently empty.</p>
          <Link to="/" className={styles.shopLink}>
            Start Shopping
          </Link>
        </div>
      ) : (
        // 5. Wrap list and summary in a new div
        <div className={styles.cartLayout}>
          <div className={styles.cartItemsList}>
            {cartItems.map((item) => (
              <div key={item.cartItemId} className={styles.cartItem}>
                <img src={item.imageUrls[0]} alt={item.name} className={styles.itemImage} />
                <div className={styles.itemDetails}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <p className={styles.itemInfo}>Size: {item.selectedSize}</p>
                  <p className={styles.itemInfo}>Color: {item.selectedColor}</p>
                  <p className={styles.itemPrice}>₹{item.price}</p>
                </div>
                <button 
                  className={styles.removeButton}
                  onClick={() => removeFromCart(item.cartItemId)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* 6. ADD THIS NEW CHECKOUT SUMMARY */}
          <div className={styles.checkoutSummary}>
            <h3 className={styles.summaryTitle}>Order Summary</h3>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <button 
              className={styles.checkoutButton}
              onClick={checkoutHandler}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;