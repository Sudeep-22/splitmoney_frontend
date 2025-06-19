import React, { useState } from 'react'
import { Container, Box, Paper, Typography, Button, Grid } from '@mui/material';
import ExpenseItem from '../components/ExpenseItem';

interface setAlertProps {
  setAlert: (type: 'error' | 'info' | 'success' | 'warning', message: string) => void;
}

const GroupPage:React.FC<setAlertProps> = ({setAlert}) => {
  const [expense, setExpense] = useState([{id:1,title:"Badminton",paidBy:"Sudeep",amount:100},
                                          {id:2,title:"Irani",paidBy:"Sahil",amount:1000}]);
  return (
    <Container maxWidth="lg">
      <Box component={Paper}
                  elevation={3}
                  p={4}
                  mt={4}
                  sx={{ borderRadius: 2, backgroundColor: '#f9f9f9', marginBottom:4}}>
        <Typography variant="h4" align="center" color="initial">Your details eg: You owe 100rs</Typography>
      </Box>
      <Box>
        <Box sx={{display:'flex', justifyContent:'space-between'}}>
              <Typography variant="h4" color="initial" >Expenses</Typography>
              <Button variant='contained'> Settle up!</Button>
        </Box>
          {expense.length !== 0  && expense.map((expense)=>(
            <ExpenseItem expense = {expense} key={expense.id} />
          ))}
      </Box>
    </Container>
  )
}

export default GroupPage
