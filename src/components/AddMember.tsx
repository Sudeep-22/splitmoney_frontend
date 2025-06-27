import React, { useEffect, useState } from 'react'
import { Container, Box, Paper, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem, type SelectChangeEvent, useTheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import { clearMessage, addMemberThunk } from '../features/group/groupSlice';
import { fetchAllUsersThunk } from '../features/auth/authThunks';

interface setAlertProps {
  setAlert: (type: 'error' | 'info' | 'success' | 'warning', message: string) => void;
  handleClose: () => void;
  groupId: string;
  triggerRefresh: () => void;
}


const AddMember:React.FC<setAlertProps> = ({setAlert, handleClose, groupId, triggerRefresh}) => {
const dispatch = useDispatch<AppDispatch>();
const { users, error } = useSelector((state: RootState) => state.auth);
const [selectedName, setSelectedName] = useState('');
const theme = useTheme();
useEffect(() => {
    dispatch(fetchAllUsersThunk());
  }, [dispatch]);

const handleChange = (event: SelectChangeEvent) => {
    setSelectedName(event.target.value);
};

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addMemberThunk({ name: selectedName, groupId }))
      .unwrap()
      .then(() => {
        handleClose();
        setAlert('success', 'Member added successfully!');
        triggerRefresh();
      })
      .catch((err) => {
        setAlert('error', err);
      });
}
  
    useEffect(() => {
       if (error) {
      setAlert('error', error);
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <Container maxWidth="xs">
      <Box
        component={Paper}
        elevation={3}
        p={4}
        mt={8}
        sx={{ borderRadius: 2, backgroundColor: theme.palette.background.paper, // ✅ dynamic background
          color: theme.palette.text.primary }}
      >
        <Typography variant="h5" align="center" sx={{ marginBottom: 4}}>
          Add Member
        </Typography>
        <form onSubmit={(e)=>handleSubmit(e)}>
        <FormControl fullWidth margin="normal">
        <InputLabel id="demo-simple-select-helper-label">Add User</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={selectedName}
          label="Add User"
          onChange={handleChange}
          sx={{marginBottom:3}}
        >
           {users.map((user) => (
                <MenuItem key={user._id} value={user.name}>
                  {user.name}
                </MenuItem>
              ))}
        </Select>
        <Grid container spacing={2}>
        <Grid size={{xs:12,sm:6}}>
            <Button fullWidth variant="contained" color="primary" type='submit'>
                Add Member
            </Button>
        </Grid>
        <Grid size={{xs:12,sm:6}}>
            <Button fullWidth variant="contained" color="warning" onClick={handleClose} >
                Cancel
            </Button>
        </Grid>
        </Grid>
      </FormControl>
        </form>
      </Box>
    </Container>
  )
}

export default AddMember;
