import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import styles from './AuthForm.module.css';
import { useAuth } from '../context/AuthContext'; // 2. Import our brain

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // For disabling the button

  const navigate = useNavigate(); // 3. Get the navigate function
  const { login } = useAuth(); // 4. Get the login function from our brain

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // 5. Call the login function
    const success = await login(email, password);
    
    setLoading(false);
    
    if (success) {
      // 6. If login is successful, go to the homepage
      navigate('/'); 
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Sign In</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>Email Address:</label>
        <input 
          type="email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        
        <label className={styles.label}>Password:</label>
        <input 
          type="password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        {/* 7. Disable button while loading */}
        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
      
      <div className={styles.redirectLink}>
        New Customer? <Link to="/register">Register Here</Link>
      </div>
    </div>
  );
}

export default LoginPage;