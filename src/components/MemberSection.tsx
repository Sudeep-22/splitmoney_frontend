import { Backdrop, Box, Button, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import AddMember from './AddMember'
import MemberList from './MemberList'

interface MemberProps{
    id: string;
    setAlert: (type: 'error' | 'info' | 'success' | 'warning', message: string) => void;
}

const MemberSection:React.FC<MemberProps> = ({id, setAlert}) => {
    const [refresh, setRefresh] = useState(false);
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
          <Box
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
          </Box>
            <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openAddMember}
            >
              <AddMember 
                setAlert={setAlert} 
                handleClose={handleClose} 
                groupId={id!} 
                triggerRefresh={() => setRefresh(prev => !prev)} 
              />
            </Backdrop>
          <hr/>
          <MemberList groupId={id!} refresh={refresh} />
        </Box>
  )
}

export default MemberSection
