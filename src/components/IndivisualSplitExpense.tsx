import {
  Box,
  Button,
  Checkbox,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { fetchMembersThunk } from "../features/group/groupSlice";
import { addExpenseThunk } from "../features/expense/expenseSlice";

interface IndivisualExpenseSplitProps {
  groupId: string;
  expenseTitle: string;
  totalExpense: number;
  paidByUserId: string;
  handleClose: () => void;
  triggerRefresh: () => void;
  resetForm: () => void;
}

interface User {
  _id: string;
  name: string;
  totalContri: number;
  isIncluded: boolean;
}

const initializeUsers = (members: any[]): User[] => {
  return members.map((member) => ({
    ...member,
    totalContri: 0,
    isIncluded: false,
  }));
};

const IndivisualSplitExpense: React.FC<IndivisualExpenseSplitProps> = ({
  groupId,
  expenseTitle,
  totalExpense,
  paidByUserId,
  handleClose,
  triggerRefresh,
  resetForm,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalTax, setTotalTax] = useState<number>(0);
  const [alertText, setAlertText] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const { members } = useSelector((state: RootState) => state.group);
  useEffect(() => {
    dispatch(fetchMembersThunk({ groupId }));
  }, [dispatch, groupId]);

  useEffect(() => {
    if (members.length > 0) {
      setUsers(initializeUsers(members));
    }
  }, [members, totalExpense]);

  const handleChange = (userId: string, newAmount: number) => {
    setUsers((prev) =>
      prev.map((user) =>
        user._id === userId ? { ...user, totalContri: newAmount } : user
      )
    );
  };

  const handleCheckboxChange = (userId: string, checked: boolean) => {
    setUsers((prev) =>
      prev.map((user) =>
        user._id === userId
          ? { ...user, isIncluded: checked, totalContri: 0 }
          : user
      )
    );
  };

  const validateTotal = () => {
    const calculatedTotal = users
      .filter((u) => u.isIncluded)
      .reduce((sum, u) => sum + u.totalContri, 0);
    if (calculatedTotal + totalTax !== totalExpense) {
      let difference = totalExpense - (calculatedTotal + totalTax);
      if (difference > 0) {
        setAlertText("Sum of expenses is less by : ₹" + difference);
      } else {
        setAlertText("Sum of expenses exceed by : ₹" + Math.abs(difference));
      }
      return;
    }
    setAlertText("Sum matches the total expense!");
    handleSubmit();
  };
  const handleSubmit = () => {
    if (!paidByUserId || !totalExpense || !expenseTitle) {
      setAlertText("Total expense, title or paid by not selected");
      return;
    }
    const filteredUser = users.filter((u) => u.isIncluded);
    const splitTax =
      totalTax > 0 && filteredUser.length > 0
        ? Math.round(totalTax / filteredUser.length)
        : 0;
    const contributions = users
      .filter((u) => u.isIncluded)
      .map((u) => ({
        paidToUserId: u._id,
        amount: u.totalContri + splitTax,
      }));

    const payload = {
      groupId,
      expense: {
        title: expenseTitle,
        amount: totalExpense,
        paidById: paidByUserId,
      },
      contributions,
    };

    dispatch(addExpenseThunk(payload))
      .unwrap()
      .then(() => {
        console.log("Expense added successfully");
        resetForm();
        triggerRefresh();
        handleClose();
      })
      .catch((err) => {
        console.error("Failed to add expense:", err);
      });
  };
  const includedUsers = users.filter((u) => u.isIncluded);
  const splitTax =
    totalTax > 0 && includedUsers.length > 0
      ? Math.round(totalTax / includedUsers.length)
      : 0;

  return (
    <Box>
      <TextField
        label="Taxes"
        sx={{ marginTop: 2 }}
        required
        value={totalTax}
        onChange={(e) => setTotalTax(Number(e.target.value))}
      />
      {users.map((user) => (
        <Grid
          container
          key={user._id}
          spacing={2}
          alignItems="center"
          sx={{ p: 2, my: 2, border: "1px solid #ccc", borderRadius: 2 }}
        >
          <Grid size={{ xs: 3, sm: 1 }}>
            <Checkbox
              checked={user.isIncluded}
              onChange={(e) => handleCheckboxChange(user._id, e.target.checked)}
            />
          </Grid>
          <Grid size={{ xs: 9, sm: 7 }}>
            <Typography variant="h6" sx={{paddingLeft:{sx:0,md:2}}}> {user.name} </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Total Contribution"
              fullWidth
              value={user.totalContri}
              onChange={(e) => handleChange(user._id, Number(e.target.value))}
              disabled={!user.isIncluded}
              helperText={
                user.isIncluded
                  ? `After tax : ₹${user.totalContri + splitTax}`
                  : ""
              }
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
        </Grid>
      ))}
      {alertText && (
        <Typography sx={{ marginBottom: 2 }} color="error">
          {" "}
          {alertText}
        </Typography>
      )}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={validateTotal}
          >
            Add Expense
          </Button>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Button
            fullWidth
            variant="contained"
            color="warning"
            onClick={() => {
              setUsers(initializeUsers(members));
              resetForm();
              handleClose();
            }}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default IndivisualSplitExpense;
