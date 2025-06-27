import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import AvatarWithOptions from "./AvatarWithOptions";

interface setAlertProps {
  mode: 'light'|'dark';
  toggleMode:()=>void;
  setAlert: (type: 'error' | 'info' | 'success' | 'warning', message: string) => void;
}

const Appbar:React.FC<setAlertProps> = ({mode, toggleMode, setAlert}) => {
  const Navigate = useNavigate();
  const Location = useLocation();
  const { user, accessToken } = useSelector((state: RootState) => state.auth);

  return (
    <AppBar position="static">
      <Container maxWidth="xl" disableGutters>
        <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between", paddingLeft: 4, paddingRight: 4 }}>
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button variant="contained" onClick={toggleMode}>{mode=='light'?"Dark Mode": "Light Mode"}</Button>
            {!accessToken && Location.pathname === "/login" && (
              <Button variant="contained" color="secondary" onClick={() => Navigate('/signUp')}>
                Sign Up
              </Button>
            )}
            {!accessToken && Location.pathname === "/signUp" && (
              <Button variant="contained" color="secondary" onClick={() => Navigate('/login')}>
                Log In
              </Button>
            )}
            {accessToken && user && (
              <AvatarWithOptions setAlert={setAlert}/>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Appbar;