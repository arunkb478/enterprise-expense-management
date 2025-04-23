import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleReset = () => {
    if (!email) {
      return;
    }

    setSuccess(true);
    setTimeout(() => navigate('/login'), 3000);
  };

  return (
    <Container maxWidth="xs">
      <Box mt={5} textAlign="center">
        <Typography variant="h5">Reset Password</Typography>
        {success && <Alert severity="success">Reset Link Sent! Redirecting to Login...</Alert>}
        <TextField
          label="Enter your Email"
          fullWidth
          margin="normal"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleReset}>
          Reset Password
        </Button>
      </Box>
    </Container>
  );
}

export default ForgotPassword;