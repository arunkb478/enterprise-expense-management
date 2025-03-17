import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Select, MenuItem, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [expenseData, setExpenseData] = useState({ category: '', amount: '' });
  const [success, setSuccess] = useState(false);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
      navigate('/login');
    } else {
      setUser(loggedInUser);
      setExpenses(JSON.parse(localStorage.getItem('expenses')) || []);
    }
  }, [navigate]);

  useEffect(() => {
    generateChartData();
  }, [expenses]);

  const generateChartData = () => {
    const categories = {};
    expenses.forEach(exp => {
      categories[exp.category] = (categories[exp.category] || 0) + parseFloat(exp.amount);
    });
    setChartData({
      labels: Object.keys(categories),
      datasets: [
        {
          data: Object.values(categories),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FFA500'],
        },
      ],
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseData({ ...expenseData, [name]: value });
  };

  const handleAddExpense = () => {
    if (!expenseData.category || !expenseData.amount) {
      return;
    }
    const newExpense = { ...expenseData, status: 'Pending', employee: user.name };
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    setExpenseData({ category: '', amount: '' });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  const handleApprove = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index].status = 'Approved';
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };

  const handleReject = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index].status = 'Rejected';
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  return (
    <Container maxWidth="md">
      <Box mt={5} textAlign="center">
        <Typography variant="h4">Welcome, {user?.name} ({user?.employeeId})</Typography>
        <Typography variant="h6">{user?.role === 'employee' ? "Employee Dashboard" : "Manager Dashboard"}</Typography>
        {success && <Alert severity="success">Expense Added Successfully!</Alert>}
        {user?.role === 'employee' && (
          <Box mt={3}>
            <TextField label="Category" name="category" fullWidth margin="normal" onChange={handleChange} />
            <TextField label="Amount" name="amount" type="number" fullWidth margin="normal" onChange={handleChange} />
            <Button variant="contained" color="primary" fullWidth onClick={handleAddExpense}>
              Add Expense
            </Button>
          </Box>
        )}
        <Box mt={4}>
          <Typography variant="h6">Expense List</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Employee</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  {user?.role === 'manager' && <TableCell>Actions</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {expenses.map((expense, index) => (
                  <TableRow key={index}>
                    <TableCell>{expense.employee}</TableCell>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell>${expense.amount}</TableCell>
                    <TableCell>{expense.status}</TableCell>
                    {user?.role === 'manager' && (
                      <TableCell>
                        {expense.status === 'Pending' && (
                          <>
                            <Button variant="contained" color="success" size="small" onClick={() => handleApprove(index)}>
                              Approve
                            </Button>
                            <Button variant="contained" color="error" size="small" onClick={() => handleReject(index)} style={{ marginLeft: '10px' }}>
                              Reject
                            </Button>
                          </>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box mt={4}>
          <Typography variant="h6">Expense Summary</Typography>
          <Pie data={chartData} />
        </Box>
        <Box mt={4}>
          <Button variant="outlined" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Dashboard;
    