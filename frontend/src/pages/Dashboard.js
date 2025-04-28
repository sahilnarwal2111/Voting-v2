import React from 'react';
import usePoll from '../hooks/usePoll';
import PollCard from '../components/polls/PollCard';
import Loader from '../components/common/Loader';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Alert } from '@mui/material';


const Dashboard = () => {
  const { polls, loading, error } = usePoll();
  const navigate = useNavigate();
  console.log("Here inside Dashboard Component : ", polls)
  const handlePollClick = (pollId) => {
    navigate(`/polls/${pollId}`); // Navigate to the poll details or voting page
  };

  return (
    <Container sx={{ mt: 4 }}>
    <Typography variant="h4" align="center" gutterBottom>
      Dashboard
    </Typography>

    {loading && <Loader />}
    {error && <Alert severity="error">{error}</Alert>}

    <Typography variant="h6" sx={{ mb: 2 }}>
      Available Polls
    </Typography>

    <Grid container spacing={3}>
      {polls.length > 0 ? (
        polls.map((poll) => (
          <Grid item key={poll._id} xs={12} sm={6} md={4}>
            <PollCard poll={poll} onClick={handlePollClick} />
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Typography>No polls available at the moment.</Typography>
        </Grid>
      )}
    </Grid>
  </Container>


    // Without Material UI
    // <div className="dashboard-container">
    //   <h1>Dashboard</h1>

    //   {loading && <Loader />}
    //   {error && <p className="error-message">{error}</p>}

    //   <div className="polls-list">
    //     <h2>Available Polls</h2>
    //     {polls.length > 0 ? (
    //       polls.map((poll) => (
    //         <PollCard key={poll._id} poll={poll} onClick={handlePollClick} />
    //       ))
    //     ) : (
    //       <p>No polls available at the moment.</p>
    //     )}
    //   </div>
    // </div>
  );
};

export default Dashboard;