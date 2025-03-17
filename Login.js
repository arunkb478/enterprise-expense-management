import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Link, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../components/Login.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ employeeId: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser) {
      setLoggedInUser(storedUser);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = () => {
    const { employeeId, password } = formData;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((u) => u.employeeId === employeeId && u.password === password);

    if (!user) {
      setError('Invalid Employee ID or Password');
      return;
    }

    localStorage.setItem('loggedInUser', JSON.stringify(user));
    setLoggedInUser(user);
    setSuccess(true);
    setError('');
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
    navigate('/login');
  };

  return (
    <div className="login-container">
      <Container maxWidth="xs" className="login-box">
        {loggedInUser ? (
          <>
            <Typography variant="h5" align="center" gutterBottom>
              Welcome, {loggedInUser.name} ({loggedInUser.employeeId})
            </Typography>
            <Button variant="contained" color="secondary" fullWidth onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h5" align="center" gutterBottom>
              Login
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">Login Successful! Redirecting...</Alert>}
            <TextField className="login-input" label="Employee ID" name="employeeId" fullWidth margin="normal" onChange={handleChange} />
            <TextField className="login-input" label="Password" name="password" type="password" fullWidth margin="normal" onChange={handleChange} />
            <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
              Login
            </Button>
            <Box mt={2} textAlign="center">
              <Link href="/forgot-password" color="primary">Forgot Password?</Link>
            </Box>
            <Box mt={2} textAlign="center">
              <Button variant="text" color="primary" onClick={() => navigate('/register')}>
                Don't have an account? Register
              </Button>
            </Box>
          </>
        )}
      </Container>
    </div>
  );
}

export default Login;