
const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.querySelector('.sidebar-toggle');
const notificationButton = document.querySelector('.notification-button');
const notificationPopup = document.querySelector('.notification-popup');
const closeNotificationButton = document.querySelector('.close-notification');


if (sidebarToggle) {
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  });
}

// Show/Hide Notifications Popup
if (notificationButton) {
  notificationButton.addEventListener('click', () => {
    notificationPopup.classList.toggle('hidden');
  });
}

// Close Notification Popup
if (closeNotificationButton) {
  closeNotificationButton.addEventListener('click', () => {
    notificationPopup.classList.add('hidden');
  });
}

// Dynamic Stats Data (Can be fetched from API)
const statsData = {
  totalIncome: 500000,
  totalExpense: 200000,
  netProfit: 300000,
};

const incomeElement = document.querySelector('.stat-income');
const expenseElement = document.querySelector('.stat-expense');
const netProfitElement = document.querySelector('.stat-net-profit');

if (incomeElement) incomeElement.textContent = `₹${statsData.totalIncome}`;
if (expenseElement) expenseElement.textContent = `₹${statsData.totalExpense}`;
if (netProfitElement) netProfitElement.textContent = `₹${statsData.netProfit}`;

// Example of handling a table (populate table with data)
const transactionsTable = document.querySelector('.transactions-table tbody');

const transactionsData = [
  {
    id: 1,
    source: 'Office Supplies',
    date: '2025-04-15',
    amount: 1500,
    status: 'Completed',
  },
  {
    id: 2,
    source: 'Employee Salary',
    date: '2025-04-12',
    amount: 30000,
    status: 'Completed',
  },
  {
    id: 3,
    source: 'Business Travel',
    date: '2025-04-10',
    amount: 5000,
    status: 'Pending',
  },
  {
    id: 4,
    source: 'Client Meeting',
    date: '2025-04-08',
    amount: 8000,
    status: 'Completed',
  },
];

transactionsData.forEach(transaction => {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${transaction.source}</td>
    <td>${transaction.date}</td>
    <td>₹${transaction.amount}</td>
    <td class="status">${transaction.status}</td>
  `;
  transactionsTable.appendChild(row);
});

// Example of adding new notifications dynamically
const notificationsList = document.querySelector('.notification-list');

const notificationsData = [
  {
    message: 'New transaction approved by the manager.',
    time: '5 mins ago',
  },
  {
    message: 'Pending approval for expense claim.',
    time: '1 hour ago',
  },
  {
    message: 'Client meeting scheduled for next week.',
    time: '2 hours ago',
  },
];

notificationsData.forEach(notification => {
  const listItem = document.createElement('li');
  listItem.innerHTML = `
    <span class="notification-content">${notification.message}</span>
    <span class="notification-time">${notification.time}</span>
  `;
  notificationsList.appendChild(listItem);
});

// Optional: Automatically fetch data from API (example using Fetch)
async function fetchStats() {
  try {
    const response = await fetch('https://api.example.com/stats');
    const data = await response.json();
    // Update the stats elements dynamically
    if (incomeElement) incomeElement.textContent = `₹${data.totalIncome}`;
    if (expenseElement) expenseElement.textContent = `₹${data.totalExpense}`;
    if (netProfitElement) netProfitElement.textContent = `₹${data.netProfit}`;
  } catch (error) {
    console.error('Error fetching stats data:', error);
  }
}

// Optional: Handle form submission for expense approval
const approveButton = document.querySelector('.approve-expense');
if (approveButton) {
  approveButton.addEventListener('click', (event) => {
    event.preventDefault();
    // Send approval request to server or update UI
    console.log('Expense approved');
  });
}

// Optional: Handle form submission for new transaction
const transactionForm = document.querySelector('.transaction-form');
if (transactionForm) {
  transactionForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const transactionData = new FormData(transactionForm);
    console.log('Transaction Submitted:', transactionData);
    // Send transaction data to server
  });
}

