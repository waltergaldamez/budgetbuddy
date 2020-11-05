import React, { useState } from 'react';

function FindUser() 
{
    const app_name = "budgetbuddiesapp";
    function buildPath(route)
    {
        if (process.env.NODE_ENV === 'production') 
        {
            return 'https://' + app_name +  '.herokuapp.com/' + route;
        }
        else
        {        
            return 'http://localhost:5000/' + route;
        }
    }

    var searchUsername;
    var friendID;
    //var searchEmail;

    const [message, setMessage] = useState('');

    // Get userID
    // var uID = localStorage.getItem('userID');

    const findUser = async event =>
    {
        event.preventDefault();
        var obj = {searchUsername: searchUsername.value, verification: false};
        var js = JSON.stringify(obj);

        try
        {
            // API call
            const response = await fetch(buildPath('api/findUser'), 
            {method:'POST', body:js,headers:{'Content-Type': 'application/json'}});

            // Parse JSON response
            var res = JSON.parse(await response.text());

            if ( res.error != '')
            {
                setMessage('No users found with this username.');
            }
            else 
            {
                localStorage.setItem('friendID', res.friendID);
                // re-route
                // window.location.href = '/FriendsPage.js';
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    }

    return(
        <div id="findUserDiv">
            <form>
                <input type="text" id="friendID" placeholder="friendID" ref={(c) => friendID = c} /><br />
                <button type="submit" onClick={findUser}>Find a User</button>
            </form>
            <span id="findUserResult">{message}</span>
        </div>
    );
};

export default FindUser;