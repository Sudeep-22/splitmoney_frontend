import React, { useState } from "react";
import { Container, Box, Paper, Typography, Button, Grid, Backdrop } from "@mui/material";
// import ExpenseItem from '../components/ExpenseItem';
import { useParams } from "react-router-dom";
import AddMember from "../components/AddMember";

interface setAlertProps {
  setAlert: (
    type: "error" | "info" | "success" | "warning",
    message: string
  ) => void;
}

const GroupPage: React.FC<setAlertProps> = ({ setAlert }) => {
  const [open, setOpen] = React.useState(false);
    const handleClose = () => {
      setOpen(false);
    };
    const handleOpen = () => {
      setOpen(true);
    };
  const { id } = useParams();
  return (
    <Container maxWidth="lg">
      <Box
        component={Paper}
        elevation={3}
        p={4}
        mt={4}
        sx={{ borderRadius: 2, backgroundColor: "#f9f9f9", marginBottom: 4 }}
      >
        <Typography variant="h4" align="center" color="initial">
          Your details eg: You owe 100rs
        </Typography>
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
            <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={open}
            >
        <AddMember setAlert={setAlert} handleClose={handleClose} groupId={id!}/>
      </Backdrop>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1" color="initial">
              Members Name
            </Typography>
            <Typography variant="body1" color="initial">
              Amount:
            </Typography>
          </Box>
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
            <Button variant="contained"> Settle up!</Button>
          </Box>
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
