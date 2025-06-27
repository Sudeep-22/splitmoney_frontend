import React, { useEffect, useState } from 'react';
import { Container, Box, Paper, Typography, Button, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import { loginThunk } from '../features/auth/authThunks';
import { clearAuthState } from '../features/auth/authSlice';

interface setAlertProps {
  setAlert: (type: 'error' | 'info' | 'success' | 'warning', message: string) => void;
}

const Login:React.FC<setAlertProps> = ({setAlert}) =>{
  
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState(false);
  const theme = useTheme();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorPassword(false);

    if (!password) {
      setErrorPassword(true);
      return;
    }

    dispatch(loginThunk({ name: username, password }));
  };

  useEffect(() => {
    if (auth.accessToken) {
      setAlert('success', 'Login Successful');
      navigate('/');
    }
  }, [auth.accessToken]);

  useEffect(() => {
    if (auth.error) {
      setAlert('error', auth.error);
      setErrorPassword(true);

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
        sx={{ borderRadius: 2, 
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary }}
      >
        <Typography variant="h5" align="center" sx={{ marginBottom: 4}}>
          Login
        </Typography>
        <form onSubmit={(e)=>handleSubmit(e)}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              fullWidth
              required
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              // margin="normal"
              />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error = {errorPassword}
              helperText = {errorPassword && "Incorrect password"}
            />
          </Grid>
          <Grid size={12}>
            <Button fullWidth variant="contained" type='submit'>
              Sign In
            </Button>
          </Grid>
        </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default Login;