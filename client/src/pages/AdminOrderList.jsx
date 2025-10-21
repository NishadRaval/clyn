import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './MyOrdersPage.module.css';
import { API_URL } from '../apiConfig'; // <-- IMPORT

function AdminOrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      // --- THIS LINE IS UPDATED ---
      const { data } = await axios.get(`${API_URL}/api/orders`);
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const markAsDelivered = async (orderId) => {
    if (window.confirm('Mark this order as delivered?')) {
      try {
        // --- THIS LINE IS UPDATED ---
        await axios.put(`${API_URL}/api/orders/${orderId}/deliver`);
        fetchOrders(); 
      } catch (error) {
        console.error('Error marking as delivered:', error);
        alert('Failed to update order.');
      }
    }
  };

  if (loading) {
    return <p>Loading all orders...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manage All Orders</h1>
      {orders.length === 0 ? (
        <p>There are no orders.</p>
      ) : (
        <table className={styles.orderTable}>
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>CUSTOMER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user ? order.user.name : 'Unknown User'}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>₹{order.totalPrice.toFixed(2)}</td>
                <td>
                  {order.isPaid ? (
                    <span className={styles.paid}>Paid</span>
                  ) : (
                    <span className={styles.notPaid}>Not Paid</span>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    <span className={styles.paid}>Delivered</span>
                  ) : (
                    <span className={styles.notPaid}>Not Delivered</span>
                  )}
                </td>
                <td className={styles.actions}>
                  <Link to={`/order/${order._id}`} className={styles.detailsButton}>
                    Details
                  </Link>
                  {!order.isDelivered && (
                    <button
                      className={styles.deliverButton}
                      onClick={() => markAsDelivered(order._id)}
                    >
                      Mark as Delivered
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminOrderList;