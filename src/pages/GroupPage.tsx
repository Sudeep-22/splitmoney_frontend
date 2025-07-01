import React, { useEffect, useMemo, useState, lazy, Suspense } from "react";
import {
  Container,
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import {
  exitGroupThunk,
  fetchGroupThunk,
  resetGroupState,
} from "../features/group/groupSlice";
import {
  fetchMemberContriThunk,
  resetExpenseState,
} from "../features/expense/expenseSlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// ✅ Lazy-loaded components
const MemberSection = lazy(() => import("../components/MemberSection"));
const ExpenseSection = lazy(() => import("../components/ExpenseSection"));
const SettleBox = lazy(() => import("../components/SettleBox"));

interface setAlertProps {
  setAlert: (
    type: "error" | "info" | "success" | "warning",
    message: string
  ) => void;
}

const GroupPage: React.FC<setAlertProps> = ({ setAlert }) => {
  const [refreshExpense, setRefreshExpense] = useState(false);
  const [openSettleBox, setOpenSettleBox] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleClose = () => setOpenSettleBox(false);
  const handleOpen = () => setOpenSettleBox(true);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { memberContributions } = useSelector(
    (state: RootState) => state.expense
  );
  const { groups } = useSelector((state: RootState) => state.group);

  const { id } = useParams();

  useEffect(() => {
    if (groups.length === 0) {
      dispatch(fetchGroupThunk());
    }
  }, [dispatch, groups.length]);

  const groupName = groups.find((g) => g._id === id)?.title || "Title2";

  useEffect(() => {
    if (id) {
      dispatch(resetExpenseState());
      dispatch(resetGroupState());
      dispatch(fetchMemberContriThunk({ groupId: id }));
    }
  }, [dispatch, id, refreshExpense]);

  const totalAmount = useMemo(() => {
    return memberContributions.reduce(
      (sum: number, member: any) => sum + member.netAmount,
      0
    );
  }, [memberContributions]);

  const handleExitClick = () => {
    dispatch(exitGroupThunk({ groupId: id! }))
      .unwrap()
      .then((message) => {
        setAlert("success", message);
        navigate("/");
      })
      .catch((err) => {
        setAlert("error", err);
      });
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ marginTop: 2, marginBottom: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Button onClick={handleBackClick} startIcon={<ArrowBackIcon />}>
            Back
          </Button>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h4">{groupName}</Typography>
        </Box>
      </Box>

      <Box
        component={Paper}
        elevation={3}
        p={4}
        mt={4}
        sx={{
          borderRadius: 2,
          backgroundColor: "background.paper",
          marginBottom: 4,
        }}
      >
        <Grid container spacing={2}>
          <Grid size={{xs:12,sm:6}}>
            <Typography
              variant="h4"
              sx={{ textAlign: { xs: "center", sm: "right" } }}
            >
              {totalAmount > 0 ? "You are owed: " : "You owe:"}
            </Typography>
          </Grid>
          <Grid size={{xs:12,sm:3}}>
            <Typography
              variant="h4"
              sx={{ textAlign: { xs: "center", sm: "left" } }}
              fontWeight="bold"
              color={totalAmount > 0 ? "success.main" : "error"}
            >
              ₹{Math.abs(totalAmount)}
            </Typography>
          </Grid>
          <Grid
            size={{xs:12,sm:3}}
            sx={{ display: "flex", justifyContent: "space-around" }}
          >
            <Button
              sx={{ marginRight: 1 }}
              variant="contained"
              onClick={handleOpen}
            >
              Settle up!
            </Button>
            <Button variant="contained" onClick={() => setOpenConfirm(true)}>
              Exit Group
            </Button>
          </Grid>
        </Grid>

        <Dialog
          open={openSettleBox}
          onClose={handleClose}
          fullWidth
          maxWidth="sm"
        >
          <Suspense
            fallback={
              <Box p={4} display="flex" justifyContent="center">
                <CircularProgress />
              </Box>
            }
          >
            <SettleBox
              setAlert={setAlert}
              handleClose={handleClose}
              groupId={id!}
              triggerRefresh={() => setRefreshExpense((prev) => !prev)}
            />
          </Suspense>
        </Dialog>
      </Box>

      <Suspense fallback={<CircularProgress />}>
        <MemberSection
          id={id!}
          setAlert={setAlert}
          refreshExpense={refreshExpense}
          triggerRefresh={() => setRefreshExpense((prev) => !prev)}
        />
        <ExpenseSection
          id={id!}
          setAlert={setAlert}
          refreshExpense={refreshExpense}
          triggerRefresh={() => setRefreshExpense((prev) => !prev)}
        />
      </Suspense>

      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Confirm Group Exit</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to exit this group? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleExitClick();
              setOpenConfirm(false);
            }}
            color="error"
            variant="contained"
            sx={{ margin: 2 }}
          >
            Exit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default GroupPage;