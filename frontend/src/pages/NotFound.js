import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 - Page Not Found</h1>
      <p style={styles.message}>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" style={styles.link}>Go to Home</Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
  },
  title: {
    fontSize: '2rem',
    color: '#ff4c4c',
  },
  message: {
    fontSize: '1.2rem',
    marginBottom: '20px',
  },
  link: {
    textDecoration: 'none',
    color: '#007bff',
    fontSize: '1.2rem',
  }
};

export default NotFound;
