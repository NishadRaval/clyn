import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './MyOrdersPage.module.css'; // We'll create this next

function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useAuth(); // We need this to know who the user is

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Call our new backend route
        const { data } = await axios.get('http://localhost:5000/api/orders/myorders');
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    // Only fetch if the user is logged in
    if (userInfo) {
      fetchOrders();
    }
  }, [userInfo]); // Re-run if userInfo changes

  if (loading) {
    return <p>Loading your orders...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Orders</h1>
      {orders.length === 0 ? (
        <p>You have not placed any orders yet.</p>
      ) : (
        <table className={styles.orderTable}>
          <thead>
            <tr>
              <th>ORDER ID</th>
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
                <td>{order.createdAt.substring(0, 10)}</td> {/* Just the date */}
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
                <td>
                  {/* We'll build this page later */}
                  <Link to={`/order/${order._id}`} className={styles.detailsButton}>
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyOrdersPage;