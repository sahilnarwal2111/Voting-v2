import React from 'react';
import { useNavigate } from 'react-router-dom';
import PollForm from '../components/polls/PollForm';
import usePoll from '../hooks/usePoll';
import { Container, Typography, Button, Box, Alert } from '@mui/material';


const CreatePoll = () => {
  console.log("Hello inside Create Poll")
  const { createPoll } = usePoll();
  const navigate = useNavigate();

  const handleCreatePoll = async (pollData) => {
    await createPoll(pollData);
    navigate('/polls'); // Redirect to the admin dashboard or another page after poll creation
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Create a New Poll
      </Typography>
      
      <PollForm onSubmit={handleCreatePoll} />
    </Container>

    // Without Material UI
    // <div className="create-poll-container">
    //   <h1>Create a New Poll</h1>
    //   <PollForm onSubmit={handleCreatePoll} />
    // </div>
  );
};

export default CreatePoll;