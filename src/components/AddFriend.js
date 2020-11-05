import React, { useState } from 'react';

function AddFriend() 
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

    var friendID;
    //var friendEmail;

    const [message, setMessage] = useState('');

    // Get userID
    var uID = localStorage.getItem('userID');
    var fID = localStorage.getItem('friendID');

    const addFriend = async event =>
    {
        event.preventDefault();
        var obj = {userID: userID.value, friendID: friendID.value, verification: false}
        var js = JSON.stringify(obj);

        try
        {
            // API call
            const response = await fetch(buildPath('api/addFriend'), 
            {method:'POST', body:js,headers:{'Content-Type': 'application/json'}});

            // Parse JSON response
            var res = JSON.parse(await response.text());

            if ( res.error != '')
            {
                setMessage('Failed to add friend.');
            }
            else 
            {
                localStorage.setItem('uID', res.userID);
                localStorage.setItem('fID', res.friendID);

                // re-route
                // window.location.href = '/FriendsPage';
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    }

    return(
        <div id="addFriendDiv">
            <form>
                <button type="submit" onClick={addFriend}>Add Friend</button>
            </form>
            <span id="addFriendResult">{message}</span>
        </div>
    );
};

export default AddFriend;