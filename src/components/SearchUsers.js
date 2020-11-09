import React, { useState } from 'react';
import FriendSearchBar from './FriendSearchBar';

function SeachUsers() 
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

    const [searchResults, setSearchResults] = useState([]); 
    const [message, setMessage] = useState('');

    // Get the user ids for the matching usernames
    const searchUsers = async event =>
    {
        event.preventDefault();
        var obj = {searchUsername: searchUsername.value, verification: false};
        var js = JSON.stringify(obj);

        try
        {
            // API call
            const response = await fetch(buildPath('api/searchUsers'), 
            {method:'POST', body:js,headers:{'Content-Type': 'application/json'}});

            // Parse JSON response
            var res = JSON.parse(await response.text());

            if ( res.error != '')
            {
                setMessage('No users found.');
            }
            else if (res.results.length == 0)
            {
                setMessage('No users found.');
            }    
            else 
            {
                setSearchResults(res.results);
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    }

    return(
        <div id="searchUsersDiv">
            <FriendSearchBar >
            </FriendSearchBar>
            <form>
                <input type="text" id="searchUsername" placeholder="searchUsername" ref={(c) => searchUsername = c} /><br />
                <button type="submit" onClick={setSearchResults}>Find a User</button>
            </form>
            <span id="findUserResult">{message}</span>
        </div>
    );
};

export default SearchUsers;