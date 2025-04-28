import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

import RegisterForm from '../components/auth/RegisterForm';

const Register = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Create a new account to start participating in polls.
        </Typography>
        <RegisterForm />
      </Paper>
    </Container>
    // Without Material UI
    // <div className="register-page-container">
    //   <h1>Register</h1>
    //   <p>Create a new account to start participating in polls.</p>
    //   <RegisterForm />
    // </div>
  );
};

export default Register;