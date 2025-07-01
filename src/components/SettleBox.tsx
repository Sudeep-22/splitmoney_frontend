import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import {
  addExpenseThunk,
  fetchMemberContriThunk,
} from "../features/expense/expenseSlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface setAlertProps {
  setAlert: (
    type: "error" | "info" | "success" | "warning",
    message: string
  ) => void;
  handleClose: () => void;
  groupId: string;
  triggerRefresh: () => void;
}

const SettleBox: React.FC<setAlertProps> = ({
  setAlert,
  handleClose,
  groupId,
  triggerRefresh,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const memberContributions = useSelector(
    (state: RootState) => state.expense.memberContributions ?? []
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const theme = useTheme();

  useEffect(() => {
    dispatch(fetchMemberContriThunk({ groupId }));
  }, [dispatch, groupId]);

  const pendingMemberContri = memberContributions.filter(
    (mc) => mc.netAmount !== 0
  );

  const handleClick = (
    paidBy: string,
    paidTo: string,
    amountSettled: number
  ) => {
    const contributions = [
      {
        paidToUserId: paidTo,
        amount: amountSettled,
      },
    ];

    const payload = {
      groupId,
      expense: {
        title: `Settlement by: ${user?.name}`,
        amount: amountSettled,
        paidById: paidBy,
      },
      contributions,
    };

    dispatch(addExpenseThunk(payload))
      .unwrap()
      .then(() => {
        console.log("Settled successfully");
        triggerRefresh();
        setAlert("success", "Amount settled successfully!");
        handleClose();
      })
      .catch((err) => {
        console.error("Failed to add expense:", err);
        setAlert("error", "Faced some error");
      });
  };

  return (
    <Container maxWidth="lg">
      <Box
        component={Paper}
        elevation={3}
        sx={{
          borderRadius: 2,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          padding: 4,
          margin: 4,
        }}
      >
        <Box>
          <Button
            onClick={handleClose}
            startIcon={<ArrowBackIcon />}
            sx={{
              color: theme.palette.primary.main,
            }}
          >
            Back
          </Button>
        </Box>

        <Typography variant="h4" align="center" sx={{ marginBottom: 4 }}>
          Settle Amounts
        </Typography>
        {pendingMemberContri.length > 0 ? (
          pendingMemberContri.map((pm) => (
            <Grid container key={pm.memberId} spacing={2}>
              <Grid size={{ xs: 8, sm: 4 }}>
                <Typography variant="h6" align="left">
                  {pm.memberName}
                </Typography>
              </Grid>
              <Grid size={{ xs: 4, sm: 4 }}>
                <Typography
                  variant="h6"
                  align="center"
                  color={pm.netAmount > 0 ? "success" : "error"}
                >
                  ₹{Math.abs(pm.netAmount)}
                </Typography>
              </Grid>
              <Grid
                size={{ xs: 12, sm: 4 }}
                sx={{ textAlign: { xs: "center", sm: "right" } }}
              >
                <Button
                  variant="contained"
                  onClick={() =>
                    handleClick(
                      pm.netAmount < 0 ? user!.id : pm.memberId,
                      pm.netAmount < 0 ? pm.memberId : user!.id,
                      Math.abs(pm.netAmount)
                    )
                  }
                >
                  {pm.netAmount < 0 ? "Pay" : "Settle"}
                </Button>
              </Grid>
            </Grid>
          ))
        ) : (
          <Typography variant="h6">All expenses have been settled.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default SettleBox;
