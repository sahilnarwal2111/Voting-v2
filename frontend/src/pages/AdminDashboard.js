import React, { useState } from 'react';
import usePoll from '../hooks/usePoll';
import PollForm from '../components/polls/PollForm';
import PollCard from '../components/polls/PollCard';
import Loader from '../components/common/Loader';

const AdminDashboard = () => {
  const { polls, loading, error, fetchPolls, createPoll } = usePoll();
  const [showPollForm, setShowPollForm] = useState(false);

  const handleCreatePoll = async (pollData) => {
    await createPoll(pollData);
    setShowPollForm(false);
  };

  return (
    <div className="admin-dashboard-container">
      <h1>Admin Dashboard</h1>

      <button onClick={() => setShowPollForm(!showPollForm)} className="toggle-form-button">
        {showPollForm ? 'Hide Poll Form' : 'Create New Poll'}
      </button>

      {showPollForm && (
        <div className="poll-form-section">
          <PollForm onSubmit={handleCreatePoll} />
        </div>
      )}

      {loading && <Loader />}
      {error && <p className="error-message">{error}</p>}

      <div className="polls-list">
        <h2>All Polls</h2>
        {polls.map((poll) => (
          <PollCard key={poll.id} poll={poll} onClick={() => console.log(`Poll ID: ${poll.id}`)} />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;