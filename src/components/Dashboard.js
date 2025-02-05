import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userData') || '[]');
    setUsers(data);
  }, []);

  const chartData = {
    labels: users.map((u, index) => `User ${index + 1}`),
    datasets: [
      {
        label: 'User Name Length',
        data: users.map(u => u.name.length),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)'
      }
    ]
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Box mb={4}>
        <Typography variant="h6">Counter Component Preview</Typography>
        <Typography>Navigate to the Counter page to interact with the counter.</Typography>
      </Box>
      <Box>
        <Typography variant="h6">User Profile Trends</Typography>
        <Line data={chartData} />
      </Box>
    </Box>
  );
}

export default Dashboard;