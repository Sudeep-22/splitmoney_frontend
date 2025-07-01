import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import {
  clearMessage,
  createGroupThunk,
  fetchGroupThunk,
} from "../features/group/groupSlice";

interface setAlertProps {
  setAlert: (
    type: "error" | "info" | "success" | "warning",
    message: string
  ) => void;
  handleClose: () => void;
}

const AddGroupBox: React.FC<setAlertProps> = ({ setAlert, handleClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const theme = useTheme();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createGroupThunk({ title: groupName, description }))
      .unwrap()
      .then(() => {
        dispatch(fetchGroupThunk());
        setGroupName("");
        setDescription("");
        handleClose();
        setAlert("success", "Group created successfully!");
      })
      .catch((err) => {
        setAlert("error", err);
      });
  };

  useEffect(() => {
    if (auth.error) {
      setAlert("error", auth.error);
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [auth.error]);

  return (
    <Container maxWidth="sm">
      <Box
        component={Paper}
        elevation={3}
        p={4}
        m={4}
        sx={{
          borderRadius: 2,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        <Typography variant="h5" align="center" sx={{ marginBottom: 4 }}>
          Create Group
        </Typography>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                fullWidth
                required
                label="Group Name"
                variant="outlined"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                label="Description"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid size={6}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                Create group
              </Button>
            </Grid>
            <Grid size={6}>
              <Button
                fullWidth
                variant="contained"
                color="warning"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default AddGroupBox;
