import { fetchBudgetData } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const currentDate = new Date().toISOString().split('T')[0];
  try {
    const data = await fetchBudgetData(currentDate);
    if (data) {
      displayBudget(data.budgetPlan);
      displayTransactions(data.transactionsList);
      displayAlerts(data.alertsList);
    }
  } catch (error) {
    displayError('Failed to load data');
  }
});

function displayBudget(budgetPlan) {
  const element = document.getElementById('budget-view');
  element.innerHTML = `Total income: ${budgetPlan.totalIncome}, Total outcome: ${budgetPlan.totalExpenses}`;
}

function displayTransactions(transactions) {
  const element = document.getElementById('transactions-view');
  element.innerHTML = transactions.map(t => `<p>${t.date} - ${t.amount} (${t.category})</p>`).join('');
}

function displayAlerts(alerts) {
  const element = document.getElementById('alerts-view');
  element.innerHTML = alerts.map(a => `<p>${a.date}: ${a.message}</p>`).join('');
}

function displayError(message) {
  const appElement = document.getElementById('app');
  appElement.innerHTML = `<div class="error">${message}</div>`;
}

function fetchBudgetData() {
    fetch('http://localhost:3001/api/budget')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        displayBudget(data);
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
}

document.addEventListener('DOMContentLoaded', fetchBudgetData);