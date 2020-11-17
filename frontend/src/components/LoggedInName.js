import React from 'react';
import { Button } from 'react-bootstrap';

function LoggedInName()
{

    // Getting from persistant storage
    var username = localStorage.getItem('username'); 

  return(
   <div className="loggedInDiv">
   	Welcome, {username}
   </div>
  );

};

export default LoggedInName;
