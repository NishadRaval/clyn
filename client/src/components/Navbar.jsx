import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useAuth } from '../context/AuthContext';
// import { useCart } from '../context/CartContext'; // Keep for later

function Navbar() {
  const { userInfo, logout } = useAuth();
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={styles.navbar}>
      {/* --- THIS IS THE CHANGE --- */}
      <Link to="/" className={styles.logoLink}>
        {/* Point the src directly to the file in the public folder */}
        <img src="public/MERNshop logo.png" alt="MERNshop Logo" className={styles.logoImage} />
      </Link>
      {/* --- END OF CHANGE --- */}

      <ul className={styles.navLinks}>
        <li>
          <Link to="/" className={styles.navLink}>Home</Link>
        </li>
        <li>
          <Link to="/cart" className={styles.navLink}>Cart</Link>
        </li>
        
        {userInfo ? (
          <>
            {userInfo.isAdmin && (
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
              <Link to="/myorders" className={styles.navLink}>
                {userInfo.name} (My Orders)
              </Link>
            </li>
            <li>
              <button onClick={logoutHandler} className={styles.logoutButton}>
                Logout
              </button>
            </li>
          </>
        ) : (
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