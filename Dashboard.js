import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

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

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <Container maxWidth="md">
        
        <Box display="flex">
          {/* Left Sidebar Menu */}
          <Box 
  width={200} 
  bgcolor="#dfe24a" 
  p={2} 
  boxShadow={1} 
  position="absolute" 
  bottom={-0} 
  left={0} 
  top={65}
  color={"green"}
  height="50vh"
  display="flex" 
  flexDirection="column" 
  justifyContent="flex-end"
>
            <List>
              <ListItem button>
                <ListItemText primary="Profile " />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Approvals" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Reports" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Analysis" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Settings" />
              </ListItem>
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </Box>
          {/* Main Content */}
          <Box flex={1} mt={5} textAlign="center">
            <Typography variant="h4">Welcome, {user?.name} ({user?.employeeId})</Typography>
            <Typography variant="h6">Your Expense Dashboard</Typography>
            <motion.div initial={{ y: -20 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
              <Typography variant="h5" mt={2}>Total Approved Amount: ${totalAmount}</Typography>
            </motion.div>
          </Box>
        </Box>
      </Container>
    </motion.div>
  );
}

export default Dashboard;
