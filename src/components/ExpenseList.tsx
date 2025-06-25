import React, { useEffect } from 'react';
import {  Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import { fetchAllExpenseThunk } from '../features/expense/expenseSlice';

interface Props {
  groupId: string;
  refreshExpense: boolean;
}

const ExpenseList: React.FC<Props> = ({ groupId, refreshExpense}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { expenses } = useSelector((state: RootState) => state.expense);

 useEffect(() => {
  dispatch(fetchAllExpenseThunk({ groupId }));
}, [dispatch, groupId, refreshExpense]);

  return (
    <Grid container size={12}>
        {expenses.length !== 0 ? (
          expenses.map((expense, index) => (
            <React.Fragment key={index}>
            <Grid size={{xs:10,sm:8}}>
                <Typography key={index} gutterBottom>
                {expense.title}
                </Typography>
            </Grid>
            <Grid size={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography align='center'> Amount: </Typography>
            </Grid>
            <Grid size={2}>
                <Typography> ₹{expense.amount} </Typography>
            </Grid>
            </React.Fragment>
          ))
        ) : (
          <Typography>No expenses yet.</Typography>
        )}
    </Grid>
  );
};

export default ExpenseList;
