import React, { useEffect, useMemo, useState } from "react";
import { Container, Box, Paper, Typography, Button, Grid, Backdrop } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import { exitGroupThunk, fetchGroupThunk } from '../features/group/groupSlice';
import MemberSection from "../components/MemberSection";
import ExpenseSection from "../components/ExpenseSection";
import { fetchMemberContriThunk } from '../features/expense/expenseSlice';
import SettleBox from "../components/SettleBox";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface setAlertProps {
  setAlert: (
    type: "error" | "info" | "success" | "warning",
    message: string
  ) => void;
}

const GroupPage: React.FC<setAlertProps> = ({ setAlert }) => {
  const [refreshExpense, setRefreshExpense] = useState(false);
  const [openSettleBox, setOpenSettleBox] = React.useState(false);

  const handleClose = () => {
    setOpenSettleBox(false);
  };
  const handleOpen = () => {
    setOpenSettleBox(true);
  };

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
const handleBackClick = () => {
  navigate(-1);
};

  return (
    <Container maxWidth="lg">
      <Box
  sx={{
    position: "relative",
    textAlign: "center",
    marginY: 2,
  }}
>
  <Button
    onClick={handleBackClick}
    startIcon={<ArrowBackIcon />}
    sx={{
      position: "absolute",
      left: 0,
      top: "50%",
      transform: "translateY(-50%)",
    }}
  >
    Back
  </Button>

  <Typography variant="h4">
    {groupName}
  </Typography>
</Box>
      <Box
        component={Paper}
        elevation={3}
        p={4}
        mt={4}
        sx={{ borderRadius: 2, backgroundColor: 'background.paper', marginBottom: 4 }}
      >
        <Grid container spacing={2}>
          
          <Grid size={{xs:12,sm:6}}>
            <Typography variant="h4" sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
              {totalAmount>0 ? "You are owed: ": "You owe :"}
            </Typography>
          </Grid>
          <Grid size={{xs:12,sm:3}}>
            <Typography variant="h4" sx={{ textAlign: { xs: 'center', sm: 'left' } }} fontWeight="bold" color={totalAmount>0?"success.main":"error"}>
              ₹{Math.abs(totalAmount)}
            </Typography>
          </Grid>
          <Grid size={{xs:12,sm:3}} sx={{display:"flex", justifyContent:"space-around"}}>
              <Button sx={{marginRight:1}} variant="contained" onClick={handleOpen}> Settle up!</Button>
              <Button variant="contained" onClick={handleExitClick}> Exit Group</Button>
          </Grid> 
        </Grid>
        <Backdrop
                sx={(theme) => ({ color: 'background.paper', zIndex: theme.zIndex.drawer + 1 })}
                open={openSettleBox}
              >
                <Box
                  sx={{
                    maxHeight: "90vh",
                    overflowY: "auto",
                    width: "90%",
                    maxWidth: 600,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    p: 3,
                  }}
                >
                  <SettleBox
                    setAlert={setAlert}
                    handleClose={handleClose}
                    groupId={id!}
                    triggerRefresh={() => setRefreshExpense(prev => !prev)}
                  />
                </Box>
              </Backdrop>
      </Box>
        <MemberSection id={id!} setAlert={setAlert} refreshExpense={refreshExpense} triggerRefresh={() => setRefreshExpense(prev => !prev)}/>
        <ExpenseSection id={id!} setAlert={setAlert} triggerRefresh={() => setRefreshExpense(prev => !prev)} refreshExpense={refreshExpense}/>
    </Container>
  );
};

export default GroupPage;
