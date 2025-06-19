export const createGroup = async (data: { title: string; description: string }) => {
  const res = await fetch('http://localhost:5000/api/group/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token') || '',
    },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to create group');
  return json;
};

export const addMember = async (data: { name: string; title: string }) => {
  const res = await fetch('http://localhost:5000/api/group/add-member', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token') || '',
    },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to add member');
  return json;
};

export const addExpense = async (data: {
  groupTitle: string;
  title: string;
  amount: number;
  paidByName: string;
}) => {
  const res = await fetch('http://localhost:5000/api/group/add-expense', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token') || '',
    },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to add expense');
  return json;
};

export const exitGroup = async (data: { groupTitle: string }) => {
  const res = await fetch('http://localhost:5000/api/group/exit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token') || '',
    },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to exit group');
  return json;
};