import "./App.css";
import { useMemo, useState } from "react";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Appbar from "./components/Appbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Groups from "./pages/Groups";
import GroupPage from "./pages/GroupPage";
import AlertTab from "./components/AlertTab";
import PrivateRoute from "./utils/PrivateRoute";
import { Box, CircularProgress } from "@mui/material";
import ExpensePage from "./pages/ExpensePage";
import { CssBaseline } from "@mui/material";
import AuthInitializer from "./components/AuthInitializer";

function App() {
  const [mode, setMode] = useState<"light" | "dark">(
    () => (localStorage.getItem("appThemeMode") as "light" | "dark") || "dark"
  );

  const toggleMode = () => {
    setMode((prev) => {
      const newMode = prev === "light" ? "dark" : "light";
      localStorage.setItem("appThemeMode", newMode);
      return newMode;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                primary: {
                  main: "#387478",
                  light: "#629584",
                  dark: "#243642",
                  contrastText: "#fff",
                },
                secondary: {
                  main: "#E2F1E7",
                  contrastText: "#243642",
                },
                background: {
                  default: "#E2F1E7",
                  paper: "#ffffff",
                },
                text: {
                  primary: "#243642",
                  secondary: "#387478",
                },
              }
            : {
                primary: {
                  main: "#629584",
                  light: "#82b29d",
                  dark: "#387478",
                  contrastText: "#fff",
                },
                secondary: {
                  main: "#243642",
                  contrastText: "#E2F1E7",
                },
                background: {
                  default: "#1e2a2f", // Softer than pure black
                  paper: "#273845",
                },
                text: {
                  primary: "#E2F1E7",
                  secondary: "#a0c8b8",
                },
              }),
        },
      }),
    [mode]
  );

  const [isAppReady, setAppReady] = useState(false);

  const [alertContent, chgAlertContent] = useState<{
    type: "error" | "info" | "success" | "warning";
    content: string;
  } | null>(null);

  const setAlert = (
    type: "error" | "info" | "success" | "warning",
    message: string
  ) => {
    chgAlertContent({ type, content: message });
    setTimeout(() => {
      chgAlertContent(null);
    }, 2500);
  };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthInitializer onReady={() => setAppReady(true)} />
        {!isAppReady ? (
          <Box
            display="flex"
            height="100vh"
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Appbar mode={mode} toggleMode={toggleMode} setAlert={setAlert} />
            <AlertTab alert={alertContent} />
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Groups setAlert={setAlert} />
                  </PrivateRoute>
                }
              />
              <Route
                path="/group/:id"
                element={
                  <PrivateRoute>
                    <GroupPage setAlert={setAlert} />
                  </PrivateRoute>
                }
              />
              <Route
                path="/expense/:id"
                element={
                  <PrivateRoute>
                    <ExpensePage />
                  </PrivateRoute>
                }
              />
              <Route path="/signUp" element={<SignUp setAlert={setAlert} />} />
              <Route path="/login" element={<Login setAlert={setAlert} />} />
            </Routes>
          </>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
