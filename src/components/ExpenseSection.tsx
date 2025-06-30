import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  Dialog,
  useTheme,
} from "@mui/material";
import React from "react";
import ExpenseList from "./ExpenseList";
import AddExpense from "./AddExpense";

interface ExpenseProps {
  id: string;
  setAlert: (
    type: "error" | "info" | "success" | "warning",
    message: string
  ) => void;
  triggerRefresh: () => void;
  refreshExpense: boolean;
}

const ExpenseSection: React.FC<ExpenseProps> = ({
  id,
  setAlert,
  triggerRefresh,
  refreshExpense,
}) => {
  const [openAddExpense, setOpenAddExpense] = React.useState(false);
  const handleClose = () => {
    setOpenAddExpense(false);
  };
  const handleOpen = () => {
    setOpenAddExpense(true);
  };
  const theme = useTheme();
  return (
    <Box
      component={Paper}
      elevation={3}
      p={4}
      mt={4}
      sx={{
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper,
        marginBottom: 4,
        color: theme.palette.text.primary,
      }}
    >
      <Grid container alignItems="center" sx={{ marginBottom: 2 }}>
        <Grid size={8}>
          <Typography variant="h4"> Expenses </Typography>
        </Grid>
        <Grid size={4} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={handleOpen}>
            Add Expense
          </Button>
        </Grid>
      </Grid>
      <Dialog open={openAddExpense} onClose={handleClose} maxWidth={false}>
        <AddExpense
          setAlert={setAlert}
          handleClose={handleClose}
          groupId={id!}
          triggerRefresh={triggerRefresh}
        />
      </Dialog>
      <hr />
      <ExpenseList groupId={id!} refreshExpense={refreshExpense} />
    </Box>
  );
};

export default ExpenseSection;
