import { Backdrop, Box, Button, Grid, Paper, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import AddMember from "./AddMember";
import MemberList from "./MemberList";

interface MemberProps {
  id: string;
  setAlert: (
    type: "error" | "info" | "success" | "warning",
    message: string
  ) => void;
  refreshExpense: boolean;
  triggerRefresh: () => void;
}

const MemberSection: React.FC<MemberProps> = ({
  id,
  setAlert,
  refreshExpense,
  triggerRefresh,
}) => {
  const [openAddMember, setOpenAddMember] = React.useState(false);
  const handleClose = () => {
    setOpenAddMember(false);
  };
  const handleOpen = () => {
    setOpenAddMember(true);
  };
  const theme = useTheme();
  return (
    <Box
      component={Paper}
      elevation={3}
      p={4}
      mt={4}
      sx={{ borderRadius: 2, backgroundColor: theme.palette.background.paper, marginBottom: 4,color: theme.palette.text.primary }}
    >
      <Grid container alignItems="center" sx={{ marginBottom: 2 }}>
        <Grid size={8}>
          <Typography variant="h4">
            {" "}
            Members{" "}
          </Typography>
        </Grid>
        <Grid size={4} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={handleOpen}>
            {" "}
            Add Members
          </Button>
        </Grid>
      </Grid>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={openAddMember}
      >
        <Box
          sx={{
            maxHeight: "90vh",
            overflowY: "auto",
            width: "90%",
            maxWidth: 600,
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 3,
          }}
        >
          <AddMember
            setAlert={setAlert}
            handleClose={handleClose}
            groupId={id!}
            triggerRefresh={triggerRefresh}
          />
        </Box>
      </Backdrop>
      <hr />
      <MemberList groupId={id!} refresh={refreshExpense} />
    </Box>
  );
};

export default MemberSection;
