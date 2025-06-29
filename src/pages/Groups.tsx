import React, { useEffect, useState } from 'react'
import CardItem from '../components/CardItem';
import { Container, Box, Typography, Button, Grid, Backdrop } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddGroupBox from '../components/AddGroupBox';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import { fetchGroupThunk } from '../features/group/groupSlice';

interface setAlertProps {
  setAlert: (type: 'error' | 'info' | 'success' | 'warning', message: string) => void;
}

const Groups:React.FC<setAlertProps> = ({setAlert}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { groups, loading, error } = useSelector((state: RootState) => state.group);

  useEffect(() => {
    dispatch(fetchGroupThunk());
  }, [dispatch])

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" color="primary" sx={{marginTop:8}}>Groups</Typography>
      <Box >
        <Grid container spacing={2}>
          {groups.length > 0 ? (
            groups.map((group) => (
              <CardItem group={group} key={group._id} />
            ))
          ) : (
            <Typography variant="body1" sx={{ mt: 2 }}>No groups found.</Typography>
          )}
        </Grid>
      </Box>
      <Button variant="contained" color="primary" sx={{marginTop:4}} startIcon={<AddBoxIcon/>} onClick={handleOpen}>
       Add Group</Button>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <AddGroupBox setAlert={setAlert} handleClose={handleClose}/>
      </Backdrop>
    </Container>
  )
}

export default Groups
