import React, { useState } from "react";
import { Container, Box, Paper, Typography, Button, Grid, Backdrop } from "@mui/material";
// import ExpenseItem from '../components/ExpenseItem';
import { useNavigate, useParams } from "react-router-dom";
import AddMember from "../components/AddMember";
import MemberList from "../components/MemberList";
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import { clearMessage, addMemberThunk,exitGroupThunk } from '../features/group/groupSlice';
import MemberSection from "../components/MemberSection";
import ExpenseSection from "../components/ExpenseSection";

interface setAlertProps {
  setAlert: (
    type: "error" | "info" | "success" | "warning",
    message: string
  ) => void;
}

const GroupPage: React.FC<setAlertProps> = ({ setAlert }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
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
        <MemberSection id={id!} setAlert={setAlert}/>
        <ExpenseSection id={id!} setAlert={setAlert}/>
            {/* <Box
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
        </Box> */}
    </Container>
  );
};

export default GroupPage;
