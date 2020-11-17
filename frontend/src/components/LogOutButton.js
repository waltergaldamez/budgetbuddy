import React from 'react';
import { Button } from 'react-bootstrap';

const LogOutButton = () => {
  const doLogout = event => 
      {
  	    event.preventDefault();

          localStorage.removeItem("username");
  				localStorage.removeItem("userID");
          window.location.href = '/';

      };  

  return (
    <Button variant="danger" type="submit" className="pink" onClick={doLogout}>
      <span class="material-icons">
        exit_to_app
      </span>
      <div class="logout black-text">Logout</div>
    </Button>
  );
}

export default LogOutButton;
