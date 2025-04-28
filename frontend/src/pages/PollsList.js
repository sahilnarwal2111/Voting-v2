import React from 'react';
import usePoll from '../hooks/usePoll';
import PollCard from '../components/polls/PollCard';
import Loader from '../components/common/Loader';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, Alert } from '@mui/material';


const PollsList = () => {
  const { polls, loading, error } = usePoll();
  const navigate = useNavigate();

  const handlePollClick = (pollId) => {
    navigate(`/polls/${pollId}`); // Navigate to the poll details or voting page
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        All Polls
      </Typography>

      {loading && <Loader />}
      {error && <Alert severity="error">{error}</Alert>}

      <Grid container spacing={3}>
        {polls.length > 0 ? (
          polls.map((poll) => (
            <Grid item xs={12} sm={6} md={4} key={poll._id}>
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
    // <div className="polls-list-container">
    //   <h1>All Polls</h1>

    //   {loading && <Loader />}
    //   {error && <p className="error-message">{error}</p>}

    //   <div className="polls-list">
    //     {polls.length > 0 ? (
    //       polls.map((poll) => (
    //         <PollCard key={poll.id} poll={poll} onClick={handlePollClick} />
    //       ))
    //     ) : (
    //       <p>No polls available at the moment.</p>
    //     )}
    //   </div>
    // </div>
  );
};

export default PollsList;