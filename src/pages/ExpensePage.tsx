import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Backdrop,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { fetchExpenseContriThunk } from "../features/expense/expenseSlice";

const ExpensePage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { expenseDetail } = useSelector((state: RootState) => state.expense);

  const { id } = useParams();

  useEffect(() => {
    if (!expenseDetail || expenseDetail.expenseId !== id) {
      dispatch(fetchExpenseContriThunk({ expenseId: id! }));
    }
  }, [dispatch, id, expenseDetail]);

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          position: "relative",
          textAlign: "center",
          marginTop: 2,
          marginBottom: 2,
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

        <Typography variant="h4" color="initial">
          {expenseDetail?.title}
        </Typography>
      </Box>
      <Box
        component={Paper}
        elevation={3}
        p={4}
        mt={4}
        sx={{ borderRadius: 2, backgroundColor: "#f9f9f9", marginBottom: 4 }}
      >
        <Grid size={12}>
          <Typography variant="h4" align="center" color="initial">
            {expenseDetail?.paidByUser.name} paid : ₹ {expenseDetail?.totalAmount}
          </Typography>
        </Grid>
        <hr />
        {expenseDetail?.contributions.map((ex) => (
          // <Container maxWidth='md' key={ex.paidToUser.id}>
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
            <Grid size={2}>
              <Typography variant="h6" align="right" color="text.secondary">
                Amount :
              </Typography>
            </Grid>
            <Grid size={2}>
              <Typography variant="h6" align="left" color="text.secondary">
                ₹ {ex.amount}
              </Typography>
            </Grid>
          </Grid>
          // </Container>
        ))}
      </Box>
    </Container>
  );
};

export default ExpensePage;
