import React, { useState, useEffect } from 'react';
import { Container, Box, Paper, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import { registerThunk } from '../features/auth/authThunks';
import { clearAuthState } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

interface setAlertProps {
  setAlert: (type: 'error' | 'info' | 'success' | 'warning', message: string) => void;
}

const SignUp: React.FC<setAlertProps> = ({ setAlert }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [errorPassword, setErrorPassword] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorPassword(false);

    if (password !== repassword) {
      setErrorPassword(true);
      return;
    }

    dispatch(registerThunk({ name: username, email: email, password }));
  };

  useEffect(() => {
    if (auth.accessToken) {
      setAlert('success', 'Registered Successfully!');
      navigate('/');
    }
  }, [auth.accessToken]);

  useEffect(() => {
    if (auth.error) {
      setAlert('error', auth.error);
      const timer = setTimeout(() => {
        dispatch(clearAuthState());
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [auth.error]);

  return (
    <Container maxWidth="xs">
      <Box
        component={Paper}
        elevation={3}
        p={4}
        mt={8}
        sx={{ borderRadius: 2, backgroundColor: '#f9f9f9' }}
      >
        <Typography variant="h5" align="center" sx={{ marginBottom: 4 }}>
          Create Account
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                fullWidth
                required
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                required
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                required
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                error={errorPassword}
                helperText={errorPassword && 'Reentered Password does not match'}
                label="Re-Enter Password"
                type="password"
                variant="outlined"
                value={repassword}
                onChange={(e) => setRepassword(e.target.value)}
              />
            </Grid>
            <Grid size={12}>
              <Button fullWidth variant="contained" color="primary" type="submit" disabled={auth.loading}>
                {auth.loading ? 'Creating...' : 'Sign Up'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default SignUp;