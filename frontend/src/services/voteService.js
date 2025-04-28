import axios from 'axios';

const API_URL = '/api/votes'; // Base URL for vote-related endpoints

// Submit a vote for a poll
export const submitVote = async (pollId, option) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(
    `${API_URL}/${pollId}`,
    { option },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

// Fetch voting results for a poll
export const fetchResults = async (pollId) => {
  const response = await axios.get(`${API_URL}/${pollId}/results`);
  return response.data;
};

export default {
  submitVote,
  fetchResults,
};