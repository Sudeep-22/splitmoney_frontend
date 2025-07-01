import React, { Suspense } from "react";
import {
  Box,
  Button,
  Dialog,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";

const AddMember = React.lazy(() => import("./AddMember"));
const MemberList = React.lazy(() => import("./MemberList"));

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
  const handleClose = () => setOpenAddMember(false);
  const handleOpen = () => setOpenAddMember(true);
  const theme = useTheme();

  return (
    <Box
      component={Paper}
      elevation={3}
      p={4}
      mt={4}
      sx={{
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper,
        marginBottom: 4,
        color: theme.palette.text.primary,
      }}
    >
      <Grid container alignItems="center" sx={{ marginBottom: 2 }}>
        <Grid size={8}>
          <Typography variant="h4"> Members </Typography>
        </Grid>
        <Grid size={4} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={handleOpen}>
            Add Members
          </Button>
        </Grid>
      </Grid>

      <Suspense fallback={<Typography p={2}>Loading Add Member...</Typography>}>
        <Dialog
          open={openAddMember}
          onClose={handleClose}
          fullWidth
          maxWidth="sm"
        >
          <AddMember
            setAlert={setAlert}
            handleClose={handleClose}
            groupId={id}
            triggerRefresh={triggerRefresh}
          />
        </Dialog>
      </Suspense>

      <hr />

      <Suspense fallback={<Typography p={2}>Loading Members...</Typography>}>
        <MemberList groupId={id} refresh={refreshExpense} />
      </Suspense>
    </Box>
  );
};

export default MemberSection;
