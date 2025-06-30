import React, { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { fetchMemberContriThunk } from "../features/expense/expenseSlice";

interface Props {
  groupId: string;
  refresh: boolean;
}

const MemberList: React.FC<Props> = ({ groupId, refresh }) => {
  const dispatch = useDispatch<AppDispatch>();
  const memberContributions = useSelector(
    (state: RootState) => state.expense.memberContributions ?? []
  );
  useEffect(() => {
    dispatch(fetchMemberContriThunk({ groupId }));
  }, [dispatch, groupId, refresh]);

  return (
    <Grid container size={12}>
      {memberContributions.length !== 0 ? (
        memberContributions.map((member, index) => (
          <React.Fragment key={index}>
            <Grid size={{ xs: 10, sm: 8 }}>
              <Typography key={index} gutterBottom>
                {member.memberName}
              </Typography>
            </Grid>
            <Grid size={2} sx={{ display: { xs: "none", sm: "block" } }}>
              <Typography align="center"> Amount: </Typography>
            </Grid>
            <Grid size={2}>
              <Typography
                fontWeight="bold"
                color={member.netAmount >= 0 ? "success.main" : "error"}
              >
                {" "}
                ₹{Math.abs(member.netAmount)}{" "}
              </Typography>
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
