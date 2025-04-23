import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Alert, Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    email: '',
    phone: '',
    dob: '',
    password: '',
    role: '',
    profilePic: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePic: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = () => {
    const { name, employeeId, email, phone, dob, password, role, profilePic } = formData;

    if (!name || !employeeId || !email || !phone || !dob || !password || !role || !profilePic) {
      setError('All fields are required');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));

    setSuccess(true);
    setError('');
    setTimeout(() => navigate('/login'), 2000);
  };

  return (
    <Container maxWidth="xs">
      <Box mt={5} textAlign="center">
        <Typography variant="h5">Register</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">Registration Successful! Redirecting...</Alert>}

        <TextField label="Name" name="name" fullWidth margin="normal" onChange={handleChange} />
        <TextField label="Employee ID" name="employeeId" fullWidth margin="normal" onChange={handleChange} />
        <TextField label="Email ID" name="email" type="email" fullWidth margin="normal" onChange={handleChange} />
        <TextField label="Phone Number" name="phone" fullWidth margin="normal" onChange={handleChange} />
        <TextField label="Date of Birth" name="dob" type="date" fullWidth margin="normal" InputLabelProps={{ shrink: true }} onChange={handleChange} />
        <TextField label="Password" name="password" type="password" fullWidth margin="normal" onChange={handleChange} />
        
        {/* Role Selection */}
        <TextField label="Role" name="role" select fullWidth margin="normal" SelectProps={{ native: true }} onChange={handleChange}>
          <option value="">Select Role</option>
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
        </TextField>

        {/* Profile Picture Upload */}
        <Box mt={2} mb={2} textAlign="center">
          {imagePreview && <img src={imagePreview} alt="Profile Preview" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover' }} />}
          <Input type="file" accept="image/*" onChange={handleFileChange} />
        </Box>

        <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
          Register
        </Button>
      </Box>
    </Container>
  );
}

export default Register;