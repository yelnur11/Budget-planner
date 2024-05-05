const API_BASE_URL = 'http://localhost:3001';

export async function fetchBudgetData(date) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/budgets/loadBudgetPlan?date=${date}`);
    if (!response.ok) throw new Error('Error loading budget data');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}