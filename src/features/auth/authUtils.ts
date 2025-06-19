export const saveToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const saveUser = (user: { id: string; name: string }) => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Clear both token and user
export const clearToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Get token
export const getToken = () => {
  return localStorage.getItem('token');
};

// Get user
export const getStoredUser = (): { id: string; name: string } | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};