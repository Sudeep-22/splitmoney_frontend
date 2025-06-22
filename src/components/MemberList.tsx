import React, { useEffect } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import { fetchMembersThunk } from '../features/group/groupSlice';

interface Props {
  groupId: string;
  refresh: boolean
}

const MemberList: React.FC<Props> = ({ groupId, refresh }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { members } = useSelector((state: RootState) => state.group);

 useEffect(() => {
  dispatch(fetchMembersThunk({ groupId }));
}, [dispatch, groupId, refresh]);

  return (
    <Grid container size={12}>
      
        {members.length !== 0 ? (
          members.map((member, index) => (
            <React.Fragment key={index}>
            <Grid size={8}>
                <Typography key={index} gutterBottom>
                {member}
                </Typography>
            </Grid>
            <Grid size={4}>
                <Typography> Amount:</Typography>
            </Grid>
            </React.Fragment>
          ))
        ) : (
          <Typography>No members in this group.</Typography>
        )}
    </Grid>
  );
};

export default MemberList;
