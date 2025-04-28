import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import usePoll from '../hooks/usePoll';
import VoteForm from '../components/polls/VoteForm';
import Loader from '../components/common/Loader';

const PollDetail = () => {
  const { polls, loading, error, fetchPolls, voteOnPoll } = usePoll();
  // const { pollId } = useParams();
  const { id: pollId } = useParams();
  const [poll, setPoll] = useState(null);

  useEffect(() => {
    if (!polls.length) {
      fetchPolls();
    } else {
      // const selectedPoll = polls.find((p) => p.id === parseInt(pollId, 10));
      const selectedPoll = polls.find((p) => p._id === pollId);
      console.log(polls)
      console.log("Updated the poll with poll id")
      console.log(selectedPoll)
      console.log("Poll ID from URL:", pollId);
      console.log("Available poll IDs:", polls.map(p => p._id));

      setPoll(selectedPoll);
    }
  }, [polls, pollId, fetchPolls]);

  const handleVote = async (option) => {
    await voteOnPoll(pollId, option);
    // const updatedPoll = polls.find((p) => p.id === parseInt(pollId, 10));
    const updatedPoll = polls.find((p) => p._id === pollId);
    
    setPoll(updatedPoll);
  };
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!poll) {
    return <p>Poll not found.</p>;
  }

  return (
    <div className="poll-detail-container">
      <h1>{poll.title}</h1>
      <p>{poll.description}</p>
      <h3>Total Votes: {poll.totalVotes}</h3>
      <VoteForm poll={poll} onSubmit={handleVote} />
    </div>
  );
};

export default PollDetail;