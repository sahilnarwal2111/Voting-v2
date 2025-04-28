import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';

const LoginForm = () => {
  const { login } = useContext(AuthContext); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // const response = await axios.post(`/api/auth/login`, { email, password });
      // // const response = await axios.post(`http://localhost:8080/api/auth/login`, { email, password });
      // // Assuming the API returns a token
      // localStorage.setItem('token', response.data.token);
      // console.log("Successful Login !")
      // console.log(response)
      // navigate('/dashboard'); // Redirect to dashboard after successful login

      await login({ email, password }); // 🔥 use context method
      console.log("Successful Login!");
      navigate('/dashboard');

    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
    {error && (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    )}
    <TextField
      margin="normal"
      required
      fullWidth
      id="email"
      label="Email Address"
      name="email"
      autoComplete="email"
      autoFocus
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <TextField
      margin="normal"
      required
      fullWidth
      name="password"
      label="Password"
      type="password"
      id="password"
      autoComplete="current-password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      sx={{ mt: 3, mb: 2 }}
    >
      Login
    </Button>
  </Box>



    //--- wihtout Material UI
    // <div className="login-form-container">
    //   <h2>Login</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div className="form-group">
    //       <label htmlFor="email">Email:</label>
    //       <input
    //         type="email"
    //         id="email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         required
    //       />
    //     </div>
    //     <div className="form-group">
    //       <label htmlFor="password">Password:</label>
    //       <input
    //         type="password"
    //         id="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         required
    //       />
    //     </div>
    //     {error && <p className="error-message">{error}</p>}
    //     <button type="submit" className="login-button">Login</button>
    //   </form>
    // </div>
  );
};

export default LoginForm;