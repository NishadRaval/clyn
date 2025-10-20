import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// We'll reuse the same styles as the 'My Orders' page
import styles from './MyOrdersPage.module.css'; 

function AdminOrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // This function will be called to load orders
  const fetchOrders = async () => {
    setLoading(true);
    try {
      // Call our new '/api/orders' admin route
      const { data } = await axios.get('http://localhost:5000/api/orders');
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  // Fetch orders when the page first loads
  useEffect(() => {
    fetchOrders();
  }, []);

  // This handler calls our new 'deliver' route
  const markAsDelivered = async (orderId) => {
    if (window.confirm('Mark this order as delivered?')) {
      try {
        await axios.put(`http://localhost:5000/api/orders/${orderId}/deliver`);
        // Refresh the list to show the change
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
                {/* We can show the user's name because we 'populated' it */}
                <td>{order.user ? order.user.name : 'Unknown User'}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice.toFixed(2)}</td>
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
                      className={styles.deliverButton} // We'll add this style
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