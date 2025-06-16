import React, { useState } from 'react'
import CardItem from '../components/CardItem';
import { Container, Box, Typography, Button, Grid } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';


const Groups = () => {
  const [groups, setGroups] = useState([{id:1,name:"Society",amount:100},{id:2,name:"Society2",amount:200}]);
  return (
    <Container maxWidth="lg">
      <Typography variant="h3" color="primary" sx={{marginTop:8}}>Groups</Typography>
      <Box >
        <Grid container spacing={2}>
          {groups.length !== 0  && groups.map((group)=>(
            <CardItem group = {group} key={group.id} />
          ))}
        </Grid>
      </Box>
      <Button variant="contained" color="primary" sx={{marginTop:4}} startIcon={<AddBoxIcon/>}>
        Add Group
      </Button>
    </Container>
  )
}

export default Groups
