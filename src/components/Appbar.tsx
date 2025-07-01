import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import AvatarWithOptions from "./AvatarWithOptions";
import SunnyIcon from "@mui/icons-material/Sunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { IconButton, Tooltip } from "@mui/material";

interface setAlertProps {
  mode: "light" | "dark";
  toggleMode: () => void;
  setAlert: (
    type: "error" | "info" | "success" | "warning",
    message: string
  ) => void;
}

const Appbar: React.FC<setAlertProps> = ({ mode, toggleMode, setAlert }) => {
  const { user, accessToken } = useSelector((state: RootState) => state.auth);

  return (
    <AppBar position="static">
      <Container maxWidth="xl" disableGutters>
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingX:2
          }}
        >
          <Box alignItems="center">
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                fontFamily: "Iceland",
                fontWeight: 400,
                fontSize: 40,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <PriceCheckIcon fontSize="medium" />
              Split Money
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Tooltip
              title={
                mode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
              }
            >
              <IconButton
                aria-label={mode === "dark" ? "Light Mode" : "Dark Mode"}
                onClick={toggleMode}
                edge="end"
                sx={{
                  mx: {xs:0,sm:2},
                  bgcolor: (theme) =>
                    mode === "dark"
                      ? theme.palette.secondary.main
                      : theme.palette.background.paper,
                  color: (theme) =>
                    mode === "dark"
                      ? theme.palette.primary.contrastText
                      : theme.palette.text.primary,
                  borderRadius: "50%",
                  transition: "background-color 0.3s, color 0.3s",
                  "&:hover": {
                    bgcolor: (theme) =>
                      mode === "dark"
                        ? theme.palette.background.default
                        : theme.palette.secondary.dark,
                  },
                }}
              >
                {mode === "dark" ? <SunnyIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>
            {accessToken && user && <AvatarWithOptions setAlert={setAlert} />}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Appbar;
