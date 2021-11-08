import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useContext } from 'react';
import AuthContext from '../auth'

export default function AlertModal() {
  const { auth } = useContext(AuthContext);
  const error_message = auth.error;

  return (
    <Alert severity="error">
      <AlertTitle>Error!</AlertTitle>
         {error_message}
    </Alert>
    
  );
}