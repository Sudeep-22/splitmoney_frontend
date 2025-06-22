import React, { useState } from "react";
import { Container, Box, Paper, Typography, Button, Grid, Backdrop } from "@mui/material";
// import ExpenseItem from '../components/ExpenseItem';
import { useNavigate, useParams } from "react-router-dom";
import AddMember from "../components/AddMember";
import MemberList from "../components/MemberList";
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import { clearMessage, addMemberThunk,exitGroupThunk } from '../features/group/groupSlice';

interface setAlertProps {
  setAlert: (
    type: "error" | "info" | "success" | "warning",
    message: string
  ) => void;
}

const GroupPage: React.FC<setAlertProps> = ({ setAlert }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const { id } = useParams();

  const handleExitClick = () => {
  dispatch(exitGroupThunk({ groupId: id! }))
    .unwrap()
    .then((message) => {
      setAlert("success", message);
      navigate("/"); // Optionally refresh the member list
    })
    .catch((err) => {
      setAlert("error", err);
    });
};

  return (
    <Container maxWidth="lg">
      <Box
        component={Paper}
        elevation={3}
        p={4}
        mt={4}
        sx={{ borderRadius: 2, backgroundColor: "#f9f9f9", marginBottom: 4 }}
      >
        <Grid container spacing={2}>
          <Grid size={{xs:12,sm:9}}>
            <Typography variant="h4" align="center" color="initial">
              You owe 100rs
            </Typography>
          </Grid>
          <Grid size={{xs:12,sm:3}} sx={{display:"flex", justifyContent:"space-around"}}>
              <Button variant="contained"> Settle up!</Button>
              <Button variant="contained" onClick={handleExitClick}> Exit Group</Button>
          </Grid>
          
        </Grid>
        
      </Box>
      <Box>
        <Box
          component={Paper}
          elevation={3}
          p={4}
          mt={4}
          sx={{ borderRadius: 2, backgroundColor: "#f9f9f9", marginBottom: 4 }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 2,
            }}
          >
            <Typography variant="h4" color="initial">
              Members
            </Typography>
            <Button variant="contained"  onClick={handleOpen} > Add Members</Button>
            </Box>
            <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={open}
            >
        <AddMember 
          setAlert={setAlert} 
          handleClose={handleClose} 
          groupId={id!} 
          triggerRefresh={() => setRefresh(prev => !prev)} 
        />
      </Backdrop>
          
          <hr/>
          <MemberList groupId={id!} refresh={refresh} />
        </Box>
            <Box
        component={Paper}
        elevation={3}
        p={4}
        mt={4}
        sx={{ borderRadius: 2, backgroundColor: "#f9f9f9", marginBottom: 4 }}
      >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h4" color="initial">
              Expenses
            </Typography>
            <Button variant="contained">Add Expense</Button>
          </Box>
          <hr/>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1" color="initial">
              Expense Name
            </Typography>
            <Typography variant="body1" color="initial">
              Amount:
            </Typography>
          </Box>
          {/* {expense.length !== 0  && expense.map((expense)=>(
            <ExpenseItem expense = {expense} key={expense.id} />
          ))} */}
          {/* <h1>Group Page for ID: {id}</h1> */}
        </Box>
      </Box>
    </Container>
  );
};

export default GroupPage;
