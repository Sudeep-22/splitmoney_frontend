
import React, { useEffect, useState } from 'react'
import { Container, Box, Paper, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText, type SelectChangeEvent, TextField, Backdrop, Input, FormLabel, RadioGroup, FormControlLabel, Radio, useTheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import { clearMessage, addMemberThunk } from '../features/group/groupSlice';
import { fetchMembersThunk } from "../features/group/groupSlice";
import SplitExpense from './SplitExpense';
import IndivisualSplitExpense from './IndivisualSplitExpense';

interface setAlertProps {
  setAlert: (type: 'error' | 'info' | 'success' | 'warning', message: string) => void;
  handleClose: () => void;
  groupId: string;
  triggerRefresh: () => void;
}


const AddExpense:React.FC<setAlertProps> = ({setAlert, handleClose, groupId, triggerRefresh}) => {
const dispatch = useDispatch<AppDispatch>();
const { members , error } = useSelector((state: RootState) => state.group);
const [selectedName, setSelectedName] = useState('');
// const [selectedId, setSelectedId] = useState();
const [showDetails, setShowDetails] = useState(false);
const [expenseTitle, setExpenseTitle] = useState('');
const [totalExpense, setTotalExpense] = useState<number>(0);
const [splitType, setSplitType] = useState<'equal' | 'individual'>('equal');

useEffect(() => {
    dispatch(fetchMembersThunk({groupId}));
  }, [dispatch]);

const handleChange = (event: SelectChangeEvent) => {
    setSelectedName(event.target.value);
};

  
    useEffect(() => {
       if (error) {
      setAlert('error', error);
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const resetForm = () => {
  setExpenseTitle('');
  setTotalExpense(0);
  setSelectedName('');
  setShowDetails(false);
};

const theme= useTheme();

  return (<>
  
    <Container maxWidth={showDetails ? "md" : "sm"}>
        <Box
        component={Paper}
        elevation={3}
        p={4}
        mt={8}
        sx={{ borderRadius: 2,  backgroundColor: theme.palette.background.paper, // ✅ dynamic background
          color: theme.palette.text.primary, }}
        >
           <Typography variant="h5" align="center" sx={{ marginBottom: 4}}>
                Add Expense
            </Typography>
            
            <TextField required fullWidth value={expenseTitle} onChange={(e)=>setExpenseTitle(e.target.value)} label="Expense Title" variant="standard" sx={{marginBottom:2}}/>
            <TextField required fullWidth value={totalExpense} onChange={(e)=>setTotalExpense(Number(e.target.value))} label="Total Expense" variant="standard" />

            <FormControl fullWidth margin="normal">
            <InputLabel id="demo-simple-select-helper-label">Paid by</InputLabel>
            <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={selectedName}
                label="Add User"
                onChange={handleChange}
                sx={{marginBottom:3}}
            >
                {members.map((member) => (
                        <MenuItem key={member._id} value={member._id}>
                        {member.name}
                        </MenuItem>
                    ))}
            </Select>
            <Grid container spacing={2}>
                <Grid size={{xs:12,sm:6}}>
                    <Button fullWidth variant="contained" type="submit" color="primary" sx={{display:showDetails ? "none" : "flex"}} onClick={()=>setShowDetails( prev => !prev)}>
                        Add Expense
                    </Button>
                </Grid>
                <Grid size={{xs:12,sm:6}}>
                    <Button fullWidth sx={{display:showDetails ? "none" : "flex"}} variant="contained" color="warning" onClick={handleClose} >
                        Cancel
                    </Button>
                </Grid>
            </Grid>
            </FormControl>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="split-type-radio"
                name="split-type"
                value={splitType}
                onChange={(e) => setSplitType(e.target.value as 'equal' | 'individual')}
              >
                <FormControlLabel value="equal" control={<Radio />} label="Split Equally" />
                <FormControlLabel value="individual" control={<Radio />} label="Individual Contribution" />
              </RadioGroup>
            </FormControl>
                    
            {showDetails && splitType === 'equal' && (<SplitExpense groupId={groupId} expenseTitle={expenseTitle} totalExpense={totalExpense!} paidByUserId={selectedName} handleClose={handleClose} triggerRefresh = {triggerRefresh} resetForm= {resetForm}/>)}
            {showDetails && splitType === 'individual' && (<IndivisualSplitExpense groupId={groupId} expenseTitle={expenseTitle} totalExpense={totalExpense!} paidByUserId={selectedName} handleClose={handleClose} triggerRefresh = {triggerRefresh} resetForm= {resetForm}/>)}
        </Box>
    </Container>
  </>)
}

export default AddExpense;
