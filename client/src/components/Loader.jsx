import React from 'react';
import styles from './Loader.module.css'; // We'll create this

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.spinner}></div>
      <span>Loading...</span> {/* Optional text */}
    </div>
  );
};

export default Loader;