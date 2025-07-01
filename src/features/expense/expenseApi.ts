import { fetchWithAuth } from "../fetchWithAuth";
const apiUrl = import.meta.env.VITE_API_URL;

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
  const res = await fetchWithAuth(
    `${apiUrl}/expense/addExpense`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );

  const json = await res.json();

  if (!res.ok) throw new Error(json.message || "Failed to add expense");

  return json;
};

export const fetchAllExpense = async (data: { groupId: string }) => {
  const res = await fetchWithAuth(
    `${apiUrl}/expense/fetchAllExpense`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to fetch expenses");
  return json.expenses;
};

export const fetchMemberContri = async (data: { groupId: string }) => {
  const res = await fetchWithAuth(
    `${apiUrl}/expense/fetchMemberContri`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to fetch expenses");
  return json.memberContributions;
};

export const fetchExpenseContri = async (data: { expenseId: string }) => {
  const res = await fetchWithAuth(
    `${apiUrl}/expense/fetchExpenseContri`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to fetch expenses");
  return json;
};

export const deleteExpense = async (data: { expenseId: string }) => {
  const res = await fetchWithAuth(
    `${apiUrl}/expense/deleteExpense`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to delete expense");
  return json;
};
