import React from 'react';
import './PollCard.css'; // Assuming you have a CSS file for styling the poll card
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Stack,
  Box,
  CircularProgress
} from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';


const PollCard = ({ poll, onClick }) => {
  // Calculate total votes
  const totalVotes = poll.options?.reduce((sum, option) => sum + (option.count || 0), 0);

  // Prepare data for pie chart
  const chartData = poll.options?.map(option => ({
    name: option.text,
    value: option.count || 0,
  }));

  // Define colors for pie slices
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6347'];

  return (  
    <Card elevation={3}>
    <CardActionArea onClick={() => onClick(poll._id)}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {poll.title}
        </Typography>

        <Typography variant="body2" color="text.secondary" paragraph>
          {poll.description}
        </Typography>

         
         {chartData && chartData.length > 0 ? (
            <PieChart width={200} height={200}>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          ) : (
            <CircularProgress size={40} />
          )}



        <Stack spacing={1} sx={{ mb: 1 }}>
          {poll.options?.map((option) => (
            <Box
              key={option._id}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                px: 1,
                py: 0.5,
                backgroundColor: '#f5f5f5',
                borderRadius: 1,
              }}
            >
              <Typography variant="body2">{option.text}</Typography>
              <Typography variant="caption" color="text.secondary">
                ({option.count} votes)
              </Typography>
            </Box>
          ))}
        </Stack>

        <Typography variant="caption" color="text.secondary">
          Total Votes: {totalVotes}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>

  );
};

export default PollCard;
