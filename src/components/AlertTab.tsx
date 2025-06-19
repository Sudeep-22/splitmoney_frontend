import Alert from '@mui/material/Alert';

import React from 'react'

interface AlertData {
  type: 'error' | 'info' | 'success' | 'warning';
  content: string;
}

interface AlertProps {
  alert: AlertData | null;
}

const AlertTab:React.FC<AlertProps> = ({alert}) => {
  if (!alert) return null;
  return (
    <Alert variant="filled" severity={alert.type} onClose={() => {}}>
      {alert.content}
    </Alert>
  );
}

export default AlertTab
