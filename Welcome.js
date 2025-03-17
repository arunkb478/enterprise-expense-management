import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h4">Welcome!</Typography>
        <Typography variant="body1" gutterBottom>
          Thank you for logging in. You can now manage your expenses.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/expenses')}>
          Go to Expenses
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => navigate('/login')} style={{ marginLeft: '10px' }}>
          Logout
        </Button>
      </Box>
    </Container>
  );
}

export default Welcome;
