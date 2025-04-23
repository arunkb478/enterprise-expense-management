import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button, List, ListItem, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bar, Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedSection, setSelectedSection] = useState('Dashboard');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
      navigate('/login');
    } else {
      setUser(loggedInUser);
      const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
      setExpenses(storedExpenses);
      const total = storedExpenses.filter(exp => exp.employee === loggedInUser.name && exp.status === 'Approved')
        .reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
      setTotalAmount(total);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  const approvedExpenses = expenses.filter(exp => exp.status === 'Approved');
  const rejectedExpenses = expenses.filter(exp => exp.status === 'Rejected');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <Container maxWidth="lg">
        <Box display="flex">
          
          {/* Sidebar Menu */}
          <Box 
            width={200} 
            bgcolor="#dfe24a" 
            p={2} 
            boxShadow={1} 
            position="absolute" 
            bottom={0} 
            left={0} 
            top={65}
            height="80vh"
            display="flex" 
            flexDirection="column" 
            justifyContent="flex-start"
          >
            <List>
              {['Profile', 'Approvals', 'Reports', 'Analysis', 'Settings'].map(section => (
                <ListItem button key={section} onClick={() => setSelectedSection(section)}>
                  <ListItemText primary={section} />
                </ListItem>
              ))}
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </Box>

          {/* Main Content */}
          <Box flex={1} ml={25} mt={5} textAlign="center">
            <Typography variant="h4">Welcome, {user?.name} ({user?.employeeId})</Typography>

            {/* Profile Section */}
            {selectedSection === 'Profile' && (
              <Box mt={3} p={3} bgcolor="#f9f9f9" borderRadius={3} boxShadow={2}>
                <Typography variant="h5">User Profile</Typography>
                <Typography>Name: {user?.name}</Typography>
                <Typography>Employee ID: {user?.employeeId}</Typography>
                <Typography>Email: {user?.email}</Typography>
                <Typography>Date of Birth: {user?.dob}</Typography>
                <img src={user?.photo} alt="Profile" width="100px" height="100px" style={{ borderRadius: '50%', marginTop: 10 }} />
              </Box>
            )}

            {/* Approvals Section */}
            {selectedSection === 'Approvals' && (
              <Box mt={3}>
                <Typography variant="h5">Expense Approvals</Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Expense</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Reason (if rejected)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {expenses.map(exp => (
                        <TableRow key={exp.id}>
                          <TableCell>{exp.description}</TableCell>
                          <TableCell>{exp.status}</TableCell>
                          <TableCell>${exp.amount}</TableCell>
                          <TableCell>{exp.status === 'Rejected' ? exp.reason : '-'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Typography variant="h6" mt={3}>Credited Amount Graph</Typography>
                <Bar data={{ labels: approvedExpenses.map(exp => exp.description), datasets: [{ label: 'Credited Amount', data: approvedExpenses.map(exp => exp.amount), backgroundColor: 'green' }] }} />
              </Box>
            )}

            {/* Reports Section */}
            {selectedSection === 'Reports' && (
              <Box mt={3}>
                <Typography variant="h5">Expense Reports</Typography>
                <Typography>Total Credited: ${totalAmount}</Typography>
                <Button variant="contained" color="primary" onClick={() => alert('Reported to Manager')}>Report Expense</Button>
              </Box>
            )}

            {/* Analysis Section */}
            {selectedSection === 'Analysis' && (
              <Box mt={3}>
                <Typography variant="h5">Expense Analysis</Typography>
                <Typography>Expense Overview</Typography>
                <Pie data={{ labels: ['Credited', 'Pending'], datasets: [{ data: [totalAmount, rejectedExpenses.length], backgroundColor: ['blue', 'red'] }] }} />
                <Typography variant="h6" mt={3}>Expense Over Time</Typography>
                <Line data={{ labels: approvedExpenses.map(exp => exp.description), datasets: [{ label: 'Amount', data: approvedExpenses.map(exp => exp.amount), borderColor: 'purple' }] }} />
              </Box>
            )}

            {/* Settings Section */}
            {selectedSection === 'Settings' && (
              <Box mt={3} p={3} bgcolor="#f9f9f9" borderRadius={3} boxShadow={2}>
                <Typography variant="h5">Settings</Typography>
                <Typography variant="h6" mt={2}>Change Password</Typography>
                <TextField label="New Password" type="password" fullWidth value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                <Button variant="contained" color="secondary" onClick={() => alert('Password Updated')} sx={{ mt: 2 }}>Update Password</Button>
                <Typography variant="h6" mt={3}>Company Support</Typography>
                <Typography>Email: support@company.com</Typography>
                <Typography>variant="h2"</Typography>
                <Typography>Phone: +1234567890</Typography>
                <Button variant="contained" color="error" onClick={handleLogout} sx={{ mt: 2 }}>Logout</Button>
              </Box>
            )}

          </Box>
        </Box>
      </Container>
    </motion.div>
  );
}

export default Dashboard;