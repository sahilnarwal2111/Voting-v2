import axios from 'axios';

const API_URL = '/api/polls'; // Base URL for poll-related endpoints

// Fetch all polls
export const fetchPolls = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Fetch a single poll by ID
export const fetchPollById = async (pollId) => {
  const response = await axios.get(`${API_URL}/${pollId}`);
  return response.data;
};

// Create a new poll
export const createPoll = async (pollData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(API_URL, pollData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Vote on a poll
export const voteOnPoll = async (pollId, option) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/${pollId}/vote`, { option }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export default {
  fetchPolls,
  fetchPollById,
  createPoll,
  voteOnPoll,
};