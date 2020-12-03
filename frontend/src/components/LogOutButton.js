import React from 'react';
import { Button } from 'react-bootstrap';

const LogOutButton = () => {
  const doLogout = event => 
      {
  	    event.preventDefault();

          localStorage.removeItem("username");
  				localStorage.removeItem("userID");
          localStorage.removeItem("email");
          window.location.href = '/';

      };  

  return (
    <Button variant="" type="submit" className="pink" onClick={doLogout}>
      <span className="material-icons">
        exit_to_app
      </span>
      <div className="logout black-text"> Logout</div>
    </Button>
  );
}

export default LogOutButton;
