import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Paper,
  Typography,
  Button,
  useTheme,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { loginThunk } from "../features/auth/authThunks";
import { clearAuthState } from "../features/auth/authSlice";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface setAlertProps {
  setAlert: (
    type: "error" | "info" | "success" | "warning",
    message: string
  ) => void;
}

const Login: React.FC<setAlertProps> = ({ setAlert }) => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    dispatch(clearAuthState());
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorPassword(false);
    setHasSubmitted(true);

    if (!password) {
      setErrorPassword(true);
      return;
    }

    dispatch(loginThunk({ name: username, password }));
  };

  useEffect(() => {
    if (auth.accessToken) {
      setAlert("success", "Login Successful");
      navigate("/");
    }
  }, [auth.accessToken]);

  useEffect(() => {
    if (auth.error) {
      setAlert("error", auth.error);
      const timer = setTimeout(() => {
        dispatch(clearAuthState());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [auth.error]);

  return (
    <Container maxWidth="xs">
      <Box
        component={Paper}
        elevation={3}
        p={4}
        mt={8}
        sx={{
          borderRadius: 2,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        <Typography variant="h5" align="center" sx={{ marginBottom: 4 }}>
          Login
        </Typography>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                fullWidth
                required
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                required
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={hasSubmitted && errorPassword}
                helperText={
                  hasSubmitted && errorPassword
                    ? auth.error || "Incorrect password"
                    : ""
                }
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword
                              ? "hide the password"
                              : "display the password"
                          }
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
            {hasSubmitted && auth.error && (
              <Grid size={12}>
                <Typography variant="body1" color="error">
                  User Credentials are wrong.
                </Typography>
              </Grid>
            )}

            <Grid size={12}>
              <Button fullWidth variant="contained" type="submit">
                Sign In
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
