import React, { useState } from 'react';

function RemoveFriend() 
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

    const [message, setMessage] = useState('');

    // Get userID
    var uID = localStorage.getItem('userID');
    var fID = localStorage.getItem('friendID');

    const removeFriend = async event =>
    {
        event.preventDefault();
        var obj = {userID: uID, friendID: fID, verification: false}
        var js = JSON.stringify(obj);

        try
        {
            // API call
            const response = await fetch(buildPath('api/removeFriend'), 
            {method:'POST', body:js,headers:{'Content-Type': 'application/json'}});

            // Parse JSON response
            var res = JSON.parse(await response.text());

            if ( res.error != '')
            {
                setMessage('Failed to remove friend.');
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    }

    return(
        <div id="removeFriendDiv">
            <form>
                <button type="submit" onClick={removeFriend}>Remove Friend</button>
            </form>
            <span id="removeFriendResult">{message}</span>
        </div>
    );
};

export default RemoveFriend;