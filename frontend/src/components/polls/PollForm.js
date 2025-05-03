import React, { useState } from 'react';
import './PollForm.css'; // Assuming you have a CSS file for styling the poll form
// import { TextField, Button, Box, Typography, Alert, IconButton } from '@mui/material';
// import AddCircleIcon from '@mui/icons-material';
// import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'; // Corrected import

const PollForm = ({ onSubmit }) => {
  const [endDate, setEndDate] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [error, setError] = useState('');

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !description.trim()) {
      setError('Title and description are required.');
      return;
    }
    if (!endDate) {
      setError('End date is required.');
      return;
    }

    if (options.some((option) => !option.trim())) {
      setError('All options must be filled out.');
      return;
    }

    if (options.length < 2) {
      setError('At least two options are required.');
      return;
    }
    const formattedEndDate = new Date(endDate).toISOString();

    // onSubmit({ title, description, options });
    onSubmit({ title, description, options, endDate: formattedEndDate });
    setTitle('');
    setDescription('');
    setOptions(['', '']);
    setEndDate('');
  };

  return (
    
    <div className="poll-form-container">
      <h2>Create a New Poll</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
  <label htmlFor="endDate">End Date:</label>
  <input
    type="datetime-local"
    id="endDate"
    value={endDate}
    onChange={(e) => setEndDate(e.target.value)}
    required
  />
</div>  
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Options:</label>
          {options.map((option, index) => (
            <div key={index} className="option-group">
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                required
              />
              {options.length > 2 && (
                <button type="button" onClick={() => removeOption(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addOption}>
            Add Option
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">Create Poll</button>
      </form>
    </div>
  );
};

export default PollForm;