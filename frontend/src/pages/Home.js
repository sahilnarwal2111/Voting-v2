import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, Stack } from '@mui/material';


const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ mt: 10, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>
        Welcome to the Polling App
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Create, manage, and participate in polls easily.
      </Typography>

      <Box mt={4}>
        <Stack spacing={2}>
          <Button 
            variant="contained" 
            color="primary" 
            // onClick={() => navigate('/dashboard')}
            onClick={() => navigate('/polls')}
          >
            View Polls
          </Button>
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={() => navigate('/register')}
          >
            Register
          </Button>
        </Stack>
      </Box>
    </Container>


    // without Material UI
    // <div className="home-container">
    //   <h1>Welcome to the Polling App</h1>
    //   <p>Create, manage, and participate in polls easily.</p>

    //   <div className="home-buttons">
    //     <button onClick={() => navigate('/dashboard')} className="home-button">
    //       View Polls
    //     </button>
    //     <button onClick={() => navigate('/login')} className="home-button">
    //       Login
    //     </button>
    //     <button onClick={() => navigate('/register')} className="home-button">
    //       Register
    //     </button>
    //   </div>
    // </div>
  );
};

export default Home;