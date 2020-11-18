import React from 'react';

function LoggedInName()
{

    // Getting from persistant storage
    var username = localStorage.getItem('userName'); 

  return(
   <div className="loggedInDiv">
   	Welcome, {username}
   </div>
  );

};

export default LoggedInName;
