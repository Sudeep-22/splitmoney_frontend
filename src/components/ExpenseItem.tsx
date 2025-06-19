import React from 'react'
import { Container, Box, Paper, Typography, Button, Grid } from '@mui/material';

interface expenseData{
    id:number;
    title: string;
    paidBy:string;
    amount: number
}

interface inputExpenseData{
    expense: expenseData;
}
const ExpenseItem:React.FC<inputExpenseData> = ({expense}) => {
    const handleClick = () => {

    }
  return (
      <Box onClick={handleClick}
            component={Paper}
            elevation={2}
            p={4}
            mt={2}
            sx={{ borderRadius: 2, backgroundColor: '#f9f9f9', alignItems:'center',
                cursor: 'pointer',
                '&:hover': {
                    boxShadow: 6,
                }
        }}>
            <Grid container spacing={2}>
                <Grid size={{xs:12,sm:7}}>
                    <Typography variant="h6" fontWeight="600" color="primary">{expense.title}</Typography>
                </Grid>
                <Grid size={{xs:12,sm:3}}>
                    <Typography variant="body2" color="text.secondary" fontStyle="italic">Paid by {expense.paidBy}</Typography>
                </Grid>
                <Grid size={{xs:12,sm:2}}>
                    <Typography variant="subtitle1" fontWeight="bold" color="success.main">Amount: {expense.amount}</Typography>
                </Grid>
            </Grid>   
        </Box>
  )
}

export default ExpenseItem
