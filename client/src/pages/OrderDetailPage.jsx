import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './PlaceOrderPage.module.css'; // Reusing style
import { API_URL } from '../apiConfig'; // <-- IMPORT

function OrderDetailPage() {
  const { id: orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        // --- THIS LINE IS UPDATED ---
        const { data } = await axios.get(`${API_URL}/api/orders/${orderId}`);
        setOrder(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order:', error);
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <p>Loading order details...</p>;
  }

  if (!order) {
    return <p>Order not found.</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Order: {order._id}</h1>
      <div className={styles.layout}>
        {/* --- LEFT COLUMN: Info --- */}
        <div className={styles.leftColumn}>
          <div className={styles.infoBox}>
            <h2 className={styles.subTitle}>Shipping</h2>
            <p>
              <strong>Name: </strong> {order.user.name} <br />
              <strong>Email: </strong> {order.user.email} <br />
              <strong>Address: </strong>
              {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
              {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </p>
            <p style={{ marginTop: '1rem' }}>
              <strong>Delivery Status: </strong>
              {order.isDelivered ? `Delivered on ${order.deliveredAt}` : 'Not Delivered'}
            </p>
          </div>

          <div className={styles.infoBox}>
            <h2 className={styles.subTitle}>Payment</h2>
            <p>
              <strong>Payment Status: </strong>
              {order.isPaid ? `Paid on ${order.paidAt}` : 'Not Paid'}
            </p>
          </div>

          <div className={styles.infoBox}>
            <h2 className={styles.subTitle}>Order Items</h2>
            <div className={styles.itemsList}>
              {order.orderItems.map((item) => (
                <div key={item.product} className={styles.item}>
                  <img src={item.image} alt={item.name} className={styles.itemImage} />
                  <Link to={`/product/${item.product}`} className={styles.itemName}>
                    {item.name} ({item.size}, {item.color})
                  </Link>
                  <span className={styles.itemPrice}>
                    {item.qty} x ₹{item.price} = ₹{(item.qty * item.price).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Summary --- */}
        <div className={styles.rightColumn}>
          <div className={styles.summaryBox}>
            <h2 className={styles.subTitle}>Order Summary</h2>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>₹{order.totalPrice.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>₹0.00</span>
            </div>
            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span>₹{order.totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailPage;