import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './AuthForm.module.css'; 
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { register } = useAuth(); // Get the register function

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    setLoading(true);
    
    // Call the register function
    const success = await register(name, email, password);
    
    setLoading(false);
    
    if (success) {
      navigate('/'); // Go to homepage after successful register
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Create Account</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>Name:</label>
        <input 
          type="text"
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required 
        />

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
        
        <label className={styles.label}>Confirm Password:</label>
        <input 
          type="password"
          className={styles.input}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        
        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? 'Creating Account...' : 'Register'}
        </button>
      </form>
      
      <div className={styles.redirectLink}>
        Already have an account? <Link to="/login">Login Here</Link>
      </div>
    </div>
  );
}

export default RegisterPage;