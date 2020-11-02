import React from 'react';

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
   <button type="button" id="logoutButton" class="buttons"
     onClick={doLogout}> Log Out </button>
   </div>
  );

};

export default LoggedInName;
