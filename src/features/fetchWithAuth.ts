import { getToken, saveToken, saveUser } from './auth/authUtils';

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = getToken() || '';

  // Attach access token to headers
  const headers: HeadersInit = {
    ...(options.headers || {}),
    'Content-Type': 'application/json',
    'x-auth-token': token,
  };

  let res = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });

  // If token expired or unauthorized
  if (res.status === 401) {
    try {
      // 🧠 Dynamic import avoids circular dependency
      const { refreshAccessTokenThunk } = await import('./auth/authThunks');
      const { default: store } = await import('../app/store');

      const result = await store.dispatch(refreshAccessTokenThunk() as any);

      if (refreshAccessTokenThunk.fulfilled.match(result)) {
        const newToken = result.payload.accessToken;

        // Retry original request with new token
        const retryHeaders: HeadersInit = {
          ...headers,
          'x-auth-token': newToken,
        };

        res = await fetch(url, {
          ...options,
          headers: retryHeaders,
          credentials: 'include',
        });
      } else {
        throw new Error('Token refresh failed');
      }
    } catch (err) {
      console.error('Token refresh or retry failed:', err);
      throw err;
    }
  }

  return res;
};