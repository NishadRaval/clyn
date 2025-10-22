import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useAuth } from '../context/AuthContext';
import { BsBag, BsPersonCircle, BsBoxArrowRight } from 'react-icons/bs';
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
      <Link to="/" className={styles.logoLink}>
        <img src="/CLYN.png" alt="CLYN Logo" className={styles.logoImage} />
      </Link>
      <ul className={styles.navLinks}>
        {/* Home link - maybe no icon needed? Or add one if you like */}
        <li>
          <Link to="/" className={styles.navLink}>
            <span>Home</span>
          </Link>
        </li>
        {/* Cart Link */}
        <li>
          <Link to="/cart" className={styles.navLink}>
            <BsBag size={18} /> {/* Icon */}
            <span>Cart</span>
          </Link>
        </li>
        
        {userInfo ? (
          // --- If user IS logged in ---
          <>
            {userInfo.isAdmin && (
              // Admin Links (Maybe add admin-specific icons later if needed)
              <>
                <li>
                  <Link to="/admin/products" className={styles.navLink}>
                    <span>Manage Products</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/orders" className={styles.navLink}>
                    <span>Manage Orders</span>
                  </Link>
                </li>
              </>
            )}
            {/* User Profile/Orders Link */}
            <li>
              <Link to="/myorders" className={`${styles.navLink} ${styles.userNameLink}`}>
                <BsPersonCircle size={18} /> {/* Icon */}
                <span className={styles.userName}>{userInfo.name}</span>
                {/* Removed "(My Orders)" text for cleaner look */}
              </Link>
            </li>
            {/* Logout Button */}
            <li>
              <button onClick={logoutHandler} className={styles.logoutButton}>
                <BsBoxArrowRight size={18} /> {/* Icon */}
                <span>Logout</span>
              </button>
            </li>
          </>
        ) : (
          // --- If user is NOT logged in ---
          <li>
            <Link to="/login" className={styles.navLink}>
              <BsPersonCircle size={18} /> {/* Icon */}
              <span>Login</span>
            </Link>
          </li>
        )}

      </ul>
    </nav>
  );
}

export default Navbar;