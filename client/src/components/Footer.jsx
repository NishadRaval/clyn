import React from 'react';
// Reuse App.module.css for styling the footer section
import styles from '../App.module.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <p>CLYN &copy; {currentYear}. All Rights Reserved.</p>
      {/* You can add more links here later, like Contact or About */}
    </footer>
  );
}

export default Footer;