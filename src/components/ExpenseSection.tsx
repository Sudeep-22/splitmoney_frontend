import { Backdrop, Box, Button, Grid, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import ExpenseList from './ExpenseList'
import AddExpense from './AddExpense';

interface ExpenseProps{
    id: string;
    setAlert: (type: 'error' | 'info' | 'success' | 'warning', message: string) => void;
    triggerRefresh: () => void;
    refreshExpense: boolean;
}

const ExpenseSection:React.FC<ExpenseProps> = ({id, setAlert, triggerRefresh, refreshExpense}) => {
      const [openAddExpense, setOpenAddExpense] = React.useState(false);
      const handleClose = () => {
        setOpenAddExpense(false);
      };
      const handleOpen = () => {
        setOpenAddExpense(true);
      };
  return (
    <Box
          component={Paper}
          elevation={3}
          p={4}
          mt={4}
          sx={{ borderRadius: 2, backgroundColor: "#f9f9f9", marginBottom: 4 }}
        >
          <Grid container alignItems='center' sx={{marginBottom:2}}>
            <Grid size={8}>
              <Typography variant="h4" color="initial"> Expenses </Typography>
            </Grid>
            <Grid size={4} sx={{display: 'flex',justifyContent: 'flex-end',}}>
              <Button variant="contained" onClick={handleOpen} >Add Expense</Button>
            </Grid>
          </Grid>
            <Backdrop
            sx={(theme) => ({ color: '#fff', 
              zIndex: theme.zIndex.drawer + 1,
              alignItems: { xs: 'flex-start', sm: 'center' },
              overflow: { xs: 'auto', sm: 'hidden' },
              paddingTop: { xs: 2, sm: 0 }, })}
            open={openAddExpense}
            >
              <AddExpense
                setAlert={setAlert} 
                handleClose={handleClose} 
                groupId={id!} 
                triggerRefresh={triggerRefresh}
              />
            </Backdrop>
          <hr/>
          <ExpenseList groupId={id!} refreshExpense/>
        </Box>
  )
}

export default ExpenseSection
