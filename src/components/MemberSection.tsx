import { Backdrop, Box, Button, Grid, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import AddMember from './AddMember'
import MemberList from './MemberList'

interface MemberProps{
    id: string;
    setAlert: (type: 'error' | 'info' | 'success' | 'warning', message: string) => void;
    refreshExpense: boolean;
    triggerRefresh:()=> void;
}

const MemberSection:React.FC<MemberProps> = ({id, setAlert, refreshExpense, triggerRefresh}) => {
      const [openAddMember, setOpenAddMember] = React.useState(false);
      const handleClose = () => {
        setOpenAddMember(false);
      };
      const handleOpen = () => {
        setOpenAddMember(true);
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
              <Typography variant="h4" color="initial"> Members </Typography>
            </Grid>
            <Grid size={4} sx={{display: 'flex',justifyContent: 'flex-end',}}>
              <Button variant="contained"  onClick={handleOpen} > Add Members</Button>
            </Grid>
          </Grid>
          {/* <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 2,
            }}
          >
            <Typography variant="h4" color="initial">
              Members
            </Typography>
            <Button variant="contained"  onClick={handleOpen} > Add Members</Button>
          </Box> */}
            <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openAddMember}
            >
              <AddMember 
                setAlert={setAlert} 
                handleClose={handleClose} 
                groupId={id!} 
                triggerRefresh={triggerRefresh} 
              />
            </Backdrop>
          <hr/>
          <MemberList groupId={id!} refresh={refreshExpense} />
        </Box>
  )
}

export default MemberSection
