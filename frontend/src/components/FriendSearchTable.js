import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { buildPath } from '../functions/buildPath';
import TableFriendMaker from '../components/TableFriendMaker';

const FriendSearchTable = () => {
  var search = "";
  const [searchResults, setResult] = useState([]);

  var objFriend = {userID:localStorage.getItem("userID")};
  var jsFriends = JSON.stringify(objFriend);
  var friends = [];


  const doSearch = async event =>
  {
      event.preventDefault();

      var obj = {searchUsername:search.value};
      var js = JSON.stringify(obj);
      try
      {
          // API call
          const response = await fetch(buildPath('api/searchUsers'),
              {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

          // Parse JSON response
          var res = JSON.parse(await response.text());


          if( res.error === '')
            setResult(res.results);
      }
      catch(e)
      {
          alert(e.toString() + "yess");
          return;
      }
  };

  return (
    <TableFriendMaker results={searchResults} />
  )
}

export default FriendSearchTable;
