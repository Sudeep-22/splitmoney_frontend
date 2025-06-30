import { useEffect, useState } from "react";
import {
  Container,
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  useTheme,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import {
  fetchExpenseContriThunk,
  deleteExpenseThunk,
} from "../features/expense/expenseSlice";

const ExpensePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { expenseDetail } = useSelector((state: RootState) => state.expense);

  const { id } = useParams();
  const [openConfirm, setOpenConfirm] = useState(false);

  useEffect(() => {
    if (!expenseDetail || expenseDetail.expenseId !== id) {
      dispatch(fetchExpenseContriThunk({ expenseId: id! }));
    }
  }, [dispatch, id, expenseDetail]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleDeleteClick = (id: string) => {
    dispatch(deleteExpenseThunk({ expenseId: id }));
    navigate(-1);
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 2,
          marginBottom: 1,
          color: theme.palette.text.primary,
        }}
      >
        <Button onClick={handleBackClick} startIcon={<ArrowBackIcon />}>
          Back
        </Button>

        <Tooltip title="Delete Expense">
          <IconButton
            aria-label="deleteExpense"
            onClick={() => setOpenConfirm(true)}
            edge="end"
            sx={{
              mx: 2,
              backgroundColor: theme.palette.background.paper,
              color: "#D11A2A",
              borderRadius: "50%",
              transition: "background-color 0.3s, color 0.3s",
              "&:hover": {
                backgroundColor: theme.palette.secondary.dark,
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Typography variant="h4" align="center" sx={{ marginBottom: 2 }}>
        {expenseDetail?.title}
      </Typography>
      <Box
        component={Paper}
        elevation={3}
        p={4}
        mt={4}
        sx={{
          borderRadius: 2,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          marginBottom: 4,
        }}
      >
        <Grid size={12}>
          <Typography variant="h4" align="center">
            {expenseDetail?.paidByUser.name} paid : ₹{" "}
            {expenseDetail?.totalAmount}
          </Typography>
        </Grid>
        <hr />
        {expenseDetail?.contributions.map((ex) => (
          <Grid
            container
            key={ex.paidToUser.id}
            spacing={2}
            alignItems="center"
            sx={{ marginY: 1 }}
          >
            <Grid size={8}>
              <Typography align="left" variant="h6" color="text.secondary">
                {ex.paidToUser.name}
              </Typography>
            </Grid>
            <Grid size={2} sx={{ display: { xs: "none", sm: "block" } }}>
              <Typography variant="h6" align="right" color="text.secondary">
                Amount :
              </Typography>
            </Grid>
            <Grid size={{ xs: 4, sm: 2 }}>
              <Typography variant="h6" align="left" color="text.secondary">
                ₹ {ex.amount}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Box>
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this expense? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDeleteClick(id!);
              setOpenConfirm(false);
            }}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ExpensePage;
