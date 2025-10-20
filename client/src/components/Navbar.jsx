import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext'; // This is here for future use (like a cart icon)

function Navbar() {
  const { userInfo, logout } = useAuth(); // Get user info and logout function
  const navigate = useNavigate();

  // This function runs when "Logout" is clicked
  const logoutHandler = () => {
    logout(); // Call the logout function from our context
    navigate('/login'); // Redirect to the login page
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.brand}>
        Leval 1
      </Link>
      <ul className={styles.navLinks}>
        <li>
          <Link to="/" className={styles.navLink}>Home</Link>
        </li>
        <li>
          <Link to="/cart" className={styles.navLink}>Cart</Link>
        </li>
        
        {/* --- This is the smart logic --- */}
        {userInfo ? (
          // --- If user IS logged in ---
          <>
            {userInfo.isAdmin && (
              // --- Show this *only* if they are an admin ---
              <>
                <li>
                  <Link to="/admin/products" className={styles.navLink}>
                    Manage Products
                  </Link>
                </li>
                <li>
                  <Link to="/admin/orders" className={styles.navLink}>
                    Manage Orders
                  </Link>
                </li>
              </>
            )}

            <li>
              {/* --- User's name links to their orders --- */}
              <Link to="/myorders" className={styles.navLink}>
                {userInfo.name} (My Orders)
              </Link>
            </li>
            
            <li>
              {/* --- Logout button --- */}
              <button onClick={logoutHandler} className={styles.logoutButton}>
                Logout
              </button>
            </li>
          </>
        ) : (
          // --- If user is NOT logged in ---
          <li>
            <Link to="/login" className={styles.navLink}>
              Login
            </Link>
          </li>
        )}

      </ul>
    </nav>
  );
}

export default Navbar;