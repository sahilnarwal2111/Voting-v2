

import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.dark',
        color: 'white',
        py: 3,
        mt: 4,
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' } }>
        <Typography variant="body2" color="grey.300">
          &copy; {currentYear} Voting App - MERN Stack Project
        </Typography>
        <Typography variant="caption" color="grey.300" display="block" sx={{ mt: 1 }}>
          Built with MongoDB, Express, React, Node.js
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
