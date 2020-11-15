import React from 'react';
import { Button } from 'react-bootstrap';

function LoggedInName()
{

    // Getting from persistant storage
    var username = localStorage.getItem('username');


    const doLogout = event => 
    {
	    event.preventDefault();

        localStorage.removeItem("username");
				localStorage.removeItem("userID");
        window.location.href = '/';

    };    

  return(
   <div id="loggedInDiv">
   <span id="userName">Logged In As {username}</span><br />
	 <Button variant="danger" type="submit" className="pink" onClick={doLogout}>
			<span class="material-icons black-text">
			 exit_to_app
			</span>
			<div class="logout black-text">Logout</div>
	 </Button>
   </div>
  );

};

export default LoggedInName;
