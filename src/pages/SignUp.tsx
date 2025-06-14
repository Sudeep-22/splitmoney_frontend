import React, { useState } from 'react';
import { Container, Box, Paper, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';


const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');

  return (
    <Container maxWidth="sm">
      <Box
        component={Paper}
        elevation={3}
        p={4}
        mt={8}
        sx={{ borderRadius: 2, backgroundColor: '#f9f9f9' }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Create Account
        </Typography>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
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
              margin="normal"
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Re-Enter Password"
              type="password"
              variant="outlined"
              value={repassword}
              onChange={(e) => setRepassword(e.target.value)}
              margin="normal"
            />
          </Grid>
          <Grid size={12}>
            <Button fullWidth variant="contained" color="primary">
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SignUp;