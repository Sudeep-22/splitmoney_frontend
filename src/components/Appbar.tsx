import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom";


const Appbar = () => {
  const Navigate = useNavigate();
  const Location = useLocation();
  return (
    <AppBar position="static">
      <Container maxWidth="xl" disableGutters>
        <Toolbar disableGutters sx={{display:"flex", justifyContent:"space-between", paddingLeft:4, paddingRight:4}}>
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
            <PriceCheckIcon fontSize="medium"/>
              Split Money
            </Typography>
          </Box>
          <Box>
            <Button variant="contained" color="secondary" onClick={()=>{Location.pathname=="/login"?Navigate('/signUp'):Navigate('/login')}}>
              {Location.pathname=="/login"?"Sign Up":"Log In"}
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Appbar;
