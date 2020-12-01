import React from 'react';

function LoggedInName()
{

    // Getting from persistant storage
    var username = localStorage.getItem('userName'); 

  return(
   <div className="loggedInDiv">
   	Welcome, <b>{username}</b>.
   </div>
  );

};

export default LoggedInName;
