import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  Dialog,
  useTheme,
  CircularProgress,
} from "@mui/material";
import React, { Suspense, useState } from "react";

const AddExpense = React.lazy(() => import("./AddExpense"));
const ExpenseList = React.lazy(() => import("./ExpenseList"));

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
  const [openAddExpense, setOpenAddExpense] = useState(false);
  const theme = useTheme();

  const handleClose = () => setOpenAddExpense(false);
  const handleOpen = () => setOpenAddExpense(true);

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
          <Typography variant="h4">Expenses</Typography>
        </Grid>
        <Grid size={4} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={handleOpen}>
            Add Expense
          </Button>
        </Grid>
      </Grid>

      <Dialog open={openAddExpense} onClose={handleClose} maxWidth="sm" fullWidth>
        <Suspense fallback={<Box p={3}><CircularProgress /></Box>}>
          <AddExpense
            setAlert={setAlert}
            handleClose={handleClose}
            groupId={id}
            triggerRefresh={triggerRefresh}
          />
        </Suspense>
      </Dialog>

      <hr />

      <Suspense fallback={<Box textAlign="center" py={4}><CircularProgress /></Box>}>
        <ExpenseList groupId={id} refreshExpense={refreshExpense} />
      </Suspense>
    </Box>
  );
};

export default ExpenseSection;