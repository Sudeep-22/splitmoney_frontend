import { Backdrop, Box, Button, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import ExpenseList from './ExpenseList'
import AddExpense from './AddExpense';

interface ExpenseProps{
    id: string;
    setAlert: (type: 'error' | 'info' | 'success' | 'warning', message: string) => void;
}

const ExpenseSection:React.FC<ExpenseProps> = ({id, setAlert}) => {
    const [refresh, setRefresh] = useState(false);
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 2,
            }}
          >
            <Typography variant="h4" color="initial">
              Expenses
            </Typography>
            <Button variant="contained"  onClick={handleOpen} >Add Expense</Button>
          </Box>
            <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openAddExpense}
            >
              <AddExpense
                setAlert={setAlert} 
                handleClose={handleClose} 
                groupId={id!} 
                triggerRefresh={() => setRefresh(prev => !prev)} 
              />
            </Backdrop>
          <hr/>
          <ExpenseList groupId={id!} refresh={refresh} />
        </Box>
  )
}

export default ExpenseSection
