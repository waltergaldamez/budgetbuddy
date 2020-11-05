import React from 'react';

import BudgetPageHeader from '../components/FriendsPageHeader';
import LoggedInName from '../components/LoggedInName';
import FindUser from '../components/FindUser';
import AddUser from '../components/AddFriend';

/* Add search bar functionality (mongoose api call?)
const FriendsList = () =>
{


    return (
        <>
        <label searchFor="username">Search by username</label>
        <input type="text" value={searchUsername.value} ></input>
    );
};
*/

const FriendsPage = () =>
{
    return(
        <div>
            <FriendsPageHeader />
            <LoggedInName />
            
            <FindUser />

            <AddFriend />
        </div>
    );
}

export default FriendsPage;
