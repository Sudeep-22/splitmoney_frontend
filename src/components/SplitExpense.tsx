import {
  Button,
  Checkbox,
  Container,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { fetchMembersThunk } from "../features/group/groupSlice";
import { addExpenseThunk } from "../features/expense/expenseSlice";

interface ExpenseSplitProps {
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
  quantity: number;
  rate: number;
  totalContri: number;
  isIncluded: boolean;
}

const initializeUsers = (members: any[], totalExpense: number): User[] => {
  const initialRate = Math.round(totalExpense / members.length);
  return members.map((member) => ({
    ...member,
    quantity: 1,
    rate: initialRate,
    totalContri: initialRate,
    isIncluded: true,
  }));
};

const SplitExpense: React.FC<ExpenseSplitProps> = ({
  groupId,
  expenseTitle,
  totalExpense,
  paidByUserId,
  handleClose,
  triggerRefresh,
  resetForm,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const { members } = useSelector((state: RootState) => state.group);
  useEffect(() => {
    dispatch(fetchMembersThunk({ groupId }));
  }, [dispatch, groupId]);

  useEffect(() => {
    if (members.length > 0) {
      setUsers(initializeUsers(members, totalExpense));
    }
  }, [members, totalExpense]);

  const handleChange = (userId: string, newQuantity: number) => {
    setUsers((prev) => {
      const updatedUsers = prev.map((user) =>
        user._id === userId ? { ...user, quantity: newQuantity } : user
      );

      const totalQuantity = updatedUsers
        .filter((user) => user.isIncluded)
        .reduce((sum, user) => sum + user.quantity, 0);

      const newRate = parseFloat((totalExpense / totalQuantity).toFixed(2));

      return updatedUsers.map((user) =>
        user.isIncluded
          ? {
              ...user,
              rate: newRate,
              totalContri: Math.round(user.quantity * newRate),
            }
          : {
              ...user,
              rate: newRate,
              totalContri: 0,
            }
      );
    });
  };

  const handleCheckboxChange = (userId: string, checked: boolean) => {
    setUsers((prev) => {
      const updatedUsers = prev.map((user) =>
        user._id === userId ? { ...user, isIncluded: checked } : user
      );

      const totalQuantity = updatedUsers
        .filter((user) => user.isIncluded)
        .reduce((sum, user) => sum + user.quantity, 0);

      const newRate = parseFloat((totalExpense / totalQuantity).toFixed(2));

      return updatedUsers.map((user) =>
        user.isIncluded
          ? {
              ...user,
              rate: newRate,
              totalContri: Math.round(user.quantity * newRate),
            }
          : {
              ...user,
              rate: newRate,
              totalContri: 0,
            }
      );
    });
  };

  const handleSubmit = () => {
    const contributions = users
      .filter((u) => u.isIncluded)
      .map((u) => ({
        paidToUserId: u._id,
        amount: u.totalContri,
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

  return (
    <Container>
      {users.map((user) => (
        <Grid
          container
          key={user._id}
          spacing={2}
          alignItems="center"
          sx={{ p: 2, my: 2, border: "1px solid #ccc", borderRadius: 2 }}
        >
          <Grid size={{ xs: 4, sm: 1 }}>
            <Checkbox
              checked={user.isIncluded}
              onChange={(e) => handleCheckboxChange(user._id, e.target.checked)}
            />
          </Grid>
          <Grid size={{ xs: 8, sm: 6 }}>
            <Typography variant="h6"> {user.name} </Typography>
          </Grid>
          <Grid size={{ xs: 6, sm: 2 }}>
            <Select
              value={user.quantity}
              onChange={(e) => handleChange(user._id, Number(e.target.value))}
              disabled={!user.isIncluded}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
            </Select>
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Typography variant="h6"> ₹{user.totalContri}</Typography>
          </Grid>
        </Grid>
      ))}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
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
              setUsers(initializeUsers(members, totalExpense));
              resetForm();
              handleClose();
            }}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SplitExpense;
