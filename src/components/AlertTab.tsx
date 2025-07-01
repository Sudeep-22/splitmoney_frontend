import { Box } from "@mui/material";
import Alert from "@mui/material/Alert";

import React from "react";

interface AlertData {
  type: "error" | "info" | "success" | "warning";
  content: string;
}

interface AlertProps {
  alert: AlertData | null;
}

const AlertTab: React.FC<AlertProps> = ({ alert }) => {
  if (!alert) return null;
  return (
    <Box
      sx={{
        position: "fixed",
        top: 70,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1300,
        width: "fit-content",
        maxWidth: "90%",
      }}
    >
      <Alert variant="filled" severity={alert.type}>
        {alert.content}
      </Alert>
    </Box>
  );
};

export default AlertTab;
