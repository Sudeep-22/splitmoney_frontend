import { fetchWithAuth } from '../fetchWithAuth';

export interface Contribution {
  paidToUserId: string;
  amount: number;
}

export interface AddExpensePayload {
  groupId: string;
  expense: {
    title: string;
    amount: number;
    paidById: string;
  };
  contributions: Contribution[];
}

export const addExpense = async (data: AddExpensePayload) => {
  const res = await fetchWithAuth('http://localhost:5000/api/expense/addExpense', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) throw new Error(json.message || 'Failed to add expense');

  return json;
};

export const fetchAllExpense = async (data: { groupId: string }) => {
  const res = await fetchWithAuth('http://localhost:5000/api/expense/fetchAllExpense', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to fetch expenses');
  return json.expenses; 
};