import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AlertContext } from '../contexts/AlertContext';

const usePoll = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setAlert } = useContext(AlertContext); 

  // Fetch all polls
  const fetchPolls = async () => {
    console.log("Fetching Polls...")
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:8080/api/polls');
      setPolls(response.data.data);
      console.log(response.data)
    } catch (err) {
      console.error('Failed to fetch polls:', err);
      setError(err.response?.data?.message || 'Failed to fetch polls.');
    } finally {
      setLoading(false);
    }
  };

  // Create a new poll
  const createPoll = async (pollData) => {
    setError(null);
    try {
      const formattedData = {
        ...pollData,
        options: pollData.options.map(option => ({ text: option }))
      };
      // const response = await axios.post('http://localhost:8080/api/polls', pollData);
      console.log('Sending Poll Data:', pollData);
      const token = localStorage.getItem('token');
      console.log('Auth Token:', token);

      const response = await axios.post(
        'http://localhost:8080/api/polls',
        formattedData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      );
      
      setPolls((prevPolls) => [...prevPolls, response.data]);
    } catch (err) {
      console.error('Failed to create poll:', err);
      setError(err.response?.data?.message || 'Failed to create poll.');
    }
  };

  // Vote on a poll
  const voteOnPoll = async (pollId, optionObj) => {
    setError(null);
    try {
      const token = localStorage.getItem('token')
      // console.log("Voting with:", { pollId, optionId: optionObj._id });
      // console.log("Here in hooks..")
      // console.log(token)  
      // console.log(pollId)
      // const response = await axios.post(`http://localhost:8080/api/polls/${pollId}/vote`, 
      //   { option });

      const response = await axios.post(
        'http://localhost:8080/api/votes',
        {
          pollId,
          optionId: optionObj._id
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      console.log("Hello after making api call for voting")
      console.log(response.data)
      // setPolls((prevPolls) =>
      //   prevPolls.map((poll) =>
      //     poll.id === pollId ? { ...poll, ...response.data } : poll
      //   )
      // );
      await fetchPolls();
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to vote on poll.';
      console.error('Failed to vote on poll:', err);
      setError(err.response?.data?.message || 'Failed to vote on poll.');
      setAlert(message, 'error');
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  return { polls, loading, error, fetchPolls, createPoll, voteOnPoll };
};

export default usePoll;