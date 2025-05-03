
import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Paper,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import Alert from './compo nents/common/Alert';
import { useContext } from 'react';
import { AlertContext } from '../../contexts/AlertContext';


const VoteForm = ({ poll, onSubmit }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setAlert } = useContext(AlertContext);


  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!selectedOption) {
      setError('Please select an option to vote.');
      return;
    }

    const selectedOptionObj = poll.options.find(option => option._id === selectedOption);
    onSubmit(selectedOptionObj);
    setSelectedOption('');

    setAlert('Vote submitted successfully!', 'success');

    navigate('/polls')
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 600, margin: 'auto', p: 4, mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        {poll.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        {poll.description}
      </Typography>

      <form onSubmit={handleSubmit}>
        <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
          <RadioGroup
            name="vote-option"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            {poll.options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option._id}
                control={<Radio />}
                label={option.text}
              />
            ))}
          </RadioGroup>
        </FormControl>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Button variant="contained" color="primary" type="submit" fullWidth>
          Vote
        </Button>
      </form>
    </Paper>
  );
};

export default VoteForm;
