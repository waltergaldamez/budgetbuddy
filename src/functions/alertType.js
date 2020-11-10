import { Alert } from 'react-bootstrap';
import React, { useState } from 'react';


export const alertType = ({message}) => {

  const [ alert, setAlert ] = useState(true);

  if (message === undefined || alert === false)
    return <span></span>;
  else if (message.includes("sent"))
    return (<span class="alert-regisration"><Alert variant="success" onClose={() => setAlert(false)} dismissible>
      <p>{message}</p>
    </Alert></span>);
  else if (message === "")
    return <span></span>;
  else
    return (<span class="alert-regisration"><Alert variant="danger" onClose={() => setAlert(false)} dismissible>
      <p>{message}</p>
    </Alert></span>);
}
