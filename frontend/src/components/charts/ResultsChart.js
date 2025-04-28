import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ResultsChart = ({ data }) => {
  // Example data format:
  // const data = [
  //   { name: 'Category A', value: 400 },
  //   { name: 'Category B', value: 300 },
  //   { name: 'Category C', value: 200 },
  //   { name: 'Category D', value: 100 },
  // ];

  return (
    <div className="results-chart-container">
      <h2>Results Chart</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResultsChart;