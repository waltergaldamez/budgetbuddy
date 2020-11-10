import { Alert } from 'react-bootstrap';
import React from 'react';


export const alertType = ({message}) => {
  if (message === undefined )
    return <span></span>;
  else if (message.includes("sent"))
    return (<span class="alert-regisration"><Alert variant="success" onClose={() => setMessage('')} dismissible>
      <p>{message}</p>
    </Alert></span>);
  else if (message === "")
    return <span></span>;
  else
    return (<span class="alert-regisration"><Alert variant="danger" onClose={() => setMessage('')} dismissible>
      <p>{message}</p>
    </Alert></span>);
}
