export interface User {
  id: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
  message: string | null;
  users: { _id: string; name: string }[];
}