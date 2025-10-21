import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './PlaceOrderPage.module.css';
import { API_URL } from '../apiConfig'; // <-- IMPORT

function PlaceOrderPage() {
  const { cartItems, shippingAddress, clearCart } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const shippingCost = 0.00;
  const totalPrice = (subtotal + shippingCost);

  const placeOrderHandler = async () => {
    try {
      // 1. Call our backend API to save the order
      const { data: createdOrder } = await axios.post(
        `${API_URL}/api/orders`,
        {
          orderItems: cartItems,
          shippingAddress: shippingAddress,
          totalPrice: totalPrice,
        }
      );

      // 2. Clear the cart
      clearCart(); 

      // 3. Show a success message (pretending payment worked)
      alert('Order placed successfully! (Payment Pending)'); 

      // 4. Redirect to the order details page for the new order
      navigate(`/order/${createdOrder._id}`); 

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
          <div className={styles.infoBox}>
            <h2 className={styles.subTitle}>Shipping</h2>
            <p>
              <strong>Address: </strong>
              {shippingAddress.address}, {shippingAddress.city},{' '}
              {shippingAddress.postalCode}, {shippingAddress.country}
            </p>
          </div>

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
                    <span className={styles.itemPrice}>{item.qty || 1} x ₹{item.price} = ₹{(item.qty || 1) * item.price}</span>
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