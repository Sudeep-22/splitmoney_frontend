import React from 'react'
import { Box, Paper, Typography, Grid } from '@mui/material';

import { useNavigate } from 'react-router-dom';

interface GroupData{
  id:number;
  name:string;
  amount:number;
}

interface CardItemProps {
  group: GroupData;
}

const CardItem: React.FC<CardItemProps>= ({group}) => {
    const navigate = useNavigate();
    const handleClick = () =>{
        console.log("I have been clicked");
        navigate(`/group/${group.id}`);
    }
  return (
        <Grid size={{xs:12,md:6}}>
        <Box onClick={handleClick}
            component={Paper}
            elevation={3}
            p={4}
            mt={4}
            sx={{ borderRadius: 2, backgroundColor: '#f9f9f9', display:'flex', flexWrap:'wrap', justifyContent:'space-between', alignItems:'center',
            cursor: 'pointer',
          '&:hover': {
            boxShadow: 6,
          },
            }}>
                <Typography variant="h4" color="initial">{group.name}</Typography>
                <Typography variant="inherit" color="textSecondary">You are owed {group.amount} rupees</Typography>
        </Box>
        </Grid>
  )
}

export default CardItem
