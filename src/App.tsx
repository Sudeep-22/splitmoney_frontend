import "./App.css";
import { useState } from "react";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Appbar from "./components/Appbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Groups from "./pages/Groups";
import GroupPage from "./pages/GroupPage";
import AlertTab from "./components/AlertTab";
import PrivateRoute from "./utils/PrivateRoute";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#FEFEFE",
      light: "#E9DB5D",
      dark: "#c9def2",
      contrastText: "#1976d2",
    },
  },
});

function App() {
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
    }, 1500);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Appbar setAlert={setAlert} />
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
            <Route path="/signUp" element={<SignUp setAlert={setAlert} />} />
            <Route path="/login" element={<Login setAlert={setAlert} />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
