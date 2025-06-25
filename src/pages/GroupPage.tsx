import React, { useEffect, useMemo, useState } from "react";
import { Container, Box, Paper, Typography, Button, Grid, Backdrop } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import { clearMessage, addMemberThunk,exitGroupThunk, fetchGroupThunk } from '../features/group/groupSlice';
import MemberSection from "../components/MemberSection";
import ExpenseSection from "../components/ExpenseSection";
import { fetchMemberContriThunk } from '../features/expense/expenseSlice';

interface setAlertProps {
  setAlert: (
    type: "error" | "info" | "success" | "warning",
    message: string
  ) => void;
}

const GroupPage: React.FC<setAlertProps> = ({ setAlert }) => {
  const [refreshExpense, setRefreshExpense] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const {memberContributions} = useSelector((state: RootState) => state.expense);
  const { groups } = useSelector((state: RootState) => state.group);

  const { id } = useParams();

  useEffect(() => {
  if (groups.length === 0) {
    dispatch(fetchGroupThunk());
  }
}, [dispatch, groups.length]);

const groupName = groups.find((g) => g._id === id)?.title || "Title2";

useEffect(() => {
  if (id) {
    dispatch(fetchMemberContriThunk({ groupId: id }));
  }
}, [dispatch, id, refreshExpense]);

const totalAmount = useMemo(() => {
  return memberContributions.reduce((sum:number, member:any) => sum + member.netAmount, 0);
}, [memberContributions]);

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
      <Grid size={12} sx={{marginTop:4}}>
            <Typography align="center" variant="h4" color="initial">{groupName}</Typography>
        </Grid>
      <Box
        component={Paper}
        elevation={3}
        p={4}
        mt={4}
        sx={{ borderRadius: 2, backgroundColor: "#f9f9f9", marginBottom: 4 }}
      >
        <Grid container spacing={2}>
          
          <Grid size={{xs:12,sm:6}}>
            <Typography variant="h4" sx={{ textAlign: { xs: 'center', sm: 'right' } }} color="initial">
              {totalAmount>0 ? "You are owed: ": "You owe :"}
            </Typography>
          </Grid>
          <Grid size={{xs:12,sm:3}}>
            <Typography variant="h4" sx={{ textAlign: { xs: 'center', sm: 'left' } }} fontWeight="bold" color="success.main">
              ₹{totalAmount}
            </Typography>
          </Grid>
          <Grid size={{xs:12,sm:3}} sx={{display:"flex", justifyContent:"space-around"}}>
              <Button sx={{marginRight:1}} variant="contained"> Settle up!</Button>
              <Button variant="contained" onClick={handleExitClick}> Exit Group</Button>
          </Grid> 
        </Grid>
      </Box>
        <MemberSection id={id!} setAlert={setAlert} refreshExpense={refreshExpense} triggerRefresh={() => setRefreshExpense(prev => !prev)}/>
        <ExpenseSection id={id!} setAlert={setAlert} triggerRefresh={() => setRefreshExpense(prev => !prev)} refreshExpense={refreshExpense}/>
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
