import React from 'react';

import { Alert } from 'react-bootstrap';

const Alert = ({alertType, message}) => {
  if (alertType === "error") {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>{message}</Alert.Heading>
      </Alert>
    )
  } else {
    return (
      <span><span>
    )
  }
}

export default Alert;
