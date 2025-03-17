// src/components/Expenses.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Box } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

function Expenses() {
  const [user, setUser] = useState(null);
  const [expenses, setExpenses] = useState(() => {
    return JSON.parse(localStorage.getItem('expenses')) || [];
  });
  const [newExpense, setNewExpense] = useState({ category: '', amount: '' });
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (loggedInUser) {
      setUser(loggedInUser);
      setAllUsers(users);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
  };

  const handleAddExpense = () => {
    if (!newExpense.category || !newExpense.amount) return;
    const newEntry = { id: expenses.length + 1, employee: user.name, ...newExpense, status: 'Pending' };
    const updatedExpenses = [...expenses, newEntry];
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    setNewExpense({ category: '', amount: '' });
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

  const generateChartData = () => {
    const categories = {};
    expenses.forEach(exp => {
      categories[exp.category] = (categories[exp.category] || 0) + parseFloat(exp.amount);
    });
    return {
      labels: Object.keys(categories),
      datasets: [
        {
          data: Object.values(categories),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FFA500'],
        },
      ],
    };
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" textAlign="center" mt={4}>
        {user?.name} ({user?.employeeId}) - {user?.role === 'manager' ? 'You are a Manager' : 'Employee'}
      </Typography>
      {user?.role === 'manager' && (
        <Box mt={3}>
          <Typography variant="h5" textAlign="center" mb={2}>Pending Expenses for Approval</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Employee</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expenses.map((expense, index) => (
                  <TableRow key={expense.id}>
                    <TableCell>{expense.employee}</TableCell>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell>${expense.amount}</TableCell>
                    <TableCell>{expense.status}</TableCell>
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      {user?.role !== 'manager' && (
        <Box>
          <Typography variant="h5" textAlign="center" mb={2}>Your Expenses</Typography>
          <Box display="flex" gap={2} mb={3}>
            <TextField label="Category" name="category" fullWidth onChange={handleChange} value={newExpense.category} />
            <TextField label="Amount" name="amount" type="number" fullWidth onChange={handleChange} value={newExpense.amount} />
            <Button variant="contained" color="primary" onClick={handleAddExpense}>Add Expense</Button>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expenses.filter(exp => exp.employee === user?.name).map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>{expense.id}</TableCell>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell>${expense.amount}</TableCell>
                    <TableCell>{expense.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      <Box mt={4}>
        <Typography variant="h6">Expense Summary</Typography>
        <Pie data={generateChartData()} />
      </Box>
    </Container>
  );
}

export default Expenses;