import React from 'react'
import { Box, Paper, Typography, Grid, useTheme } from '@mui/material';

import { useNavigate } from 'react-router-dom';

interface GroupData {
  _id: string;
  title: string;
  description: string;
}

interface CardItemProps {
  group: GroupData;
}

const CardItem: React.FC<CardItemProps>= ({group}) => {
    const navigate = useNavigate();
    const handleClick = () =>{
        navigate(`/group/${group._id}`);
    }
    const theme = useTheme();
  return (
        <Grid size={{xs:12,md:6}}>
        <Box onClick={handleClick}
            component={Paper}
            elevation={3}
            p={4}
            mt={4}
            sx={{ borderRadius: 2, backgroundColor: theme.palette.background.paper, // ✅ dynamic background
          color: theme.palette.text.primary , display:'flex', flexDirection: 'column',
              alignItems: 'flex-start',
            cursor: 'pointer',
          '&:hover': {
            boxShadow: 6,
          },
            }}>
                <Typography variant="h4" gutterBottom>{group.title.slice(0,50)}</Typography>
                <Typography variant="inherit" color="textSecondary">{group.description.slice(0,50)}</Typography>
        </Box>
        </Grid>
  )
}

export default CardItem
