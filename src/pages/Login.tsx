import React, { useEffect, useState } from 'react';
import { Container, Box, Paper, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

const Login = () =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState(false);

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        if(!password){
            setErrorPassword(true);
        }else{
            setErrorPassword(false);
        }
        console.log(username + "+" + password);
    }
    
  return (
    <Container maxWidth="xs">
      <Box
        component={Paper}
        elevation={3}
        p={4}
        mt={8}
        sx={{ borderRadius: 2, backgroundColor: '#f9f9f9' }}
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
              // margin="normal"
            />
          </Grid>
          <Grid size={12}>
            <Button fullWidth variant="contained" color="primary" type='submit'>
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