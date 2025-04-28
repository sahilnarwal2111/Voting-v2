import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Login
        </Typography>
        <Typography variant="body1" align="center" mb={3}>
          Welcome back! Please log in to your account.
        </Typography>
        <LoginForm />
      </Box>
    </Container>
    //---
    // <div className="login-page-container">
    //   <h1>Login</h1>
    //   <p>Welcome back! Please log in to your account.</p>
    //   <LoginForm />
    // </div>
  );
};

export default Login;