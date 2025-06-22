import { fetchWithAuth } from '../fetchWithAuth';

export const fetchGroup = async () => {
  const res = await fetchWithAuth('http://localhost:5000/api/group/fetchGroup', {
    method: 'POST', // this should be POST as per your backend, not GET
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to fetch group');
  return json;
};

export const fetchMembers = async (data: { groupId : string}) => {
  const res = await fetchWithAuth('http://localhost:5000/api/group/fetchMembers', {
    method: 'POST',
    body: JSON.stringify(data), // this should be POST as per your backend, not GET
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to fetch members');
  return json;
};

export const createGroup = async (data: { title: string; description: string }) => {
  const res = await fetchWithAuth('http://localhost:5000/api/group/createGroup', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to create group');
  return json;
};

export const addMember = async (data: { name: string; groupId: string }) => {
  const res = await fetchWithAuth('http://localhost:5000/api/group/addMember', {
    method: 'POST',
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
  const res = await fetchWithAuth('http://localhost:5000/api/group/addExpense', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to add expense');
  return json;
};

export const exitGroup = async (data: { groupId: string }) => {
  const res = await fetchWithAuth('http://localhost:5000/api/group/exitGroup', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to exit group');
  return json;
};