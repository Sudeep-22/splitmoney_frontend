import React, { useEffect } from 'react';
import {  Box, Grid, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import { fetchAllExpenseThunk } from '../features/expense/expenseSlice';
import { useNavigate } from 'react-router-dom';

interface Props {
  groupId: string;
  refreshExpense: boolean;
}

const ExpenseList: React.FC<Props> = ({ groupId, refreshExpense}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { expenses } = useSelector((state: RootState) => state.expense);
  const handleClick = (id:string) => {
    navigate(`/expense/${id}`); 
  }
  const theme = useTheme();

 useEffect(() => {
  dispatch(fetchAllExpenseThunk({ groupId }));
}, [dispatch, groupId, refreshExpense]);

  return (
    <Box>
        {expenses.length !== 0 ? (
          expenses.map((expense, index) => (
            <Grid
            container
            onClick={()=>handleClick(expense.id)}
            key={index}
            spacing={2}
            alignItems="center"
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              boxShadow: 2,
              padding: 2,
              marginY: 1,
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              cursor: 'pointer',
          '&:hover': {
            boxShadow: 4,
          },
            }}>
            <Grid size={{xs:9,sm:6}}>
                <Typography key={index} gutterBottom>
                {expense.title}
                </Typography>
            </Grid>
            <Grid size={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography  gutterBottom>
                {expense.paidByName}
                </Typography>
            </Grid>
            <Grid size={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography align='center'> Amount: </Typography>
            </Grid>
            <Grid size={{xs:3,sm:2}}>
                <Typography> ₹{expense.amount} </Typography>
            </Grid>
            </Grid>
          ))
        ) : (
          <Typography>No expenses yet.</Typography>
        )}
    </Box>
  );
};

export default ExpenseList;
